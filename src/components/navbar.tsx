import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import styles from "@/styles/components.module.sass";
import router from "next/router";
import Image from "next/image";

export default function Navbar() {
    const { data: session } = useSession();

    async function handleLogout() {
        await signOut();
        router.push("/");
    }

    if(session){
        return(
            <div className={styles.nav}>
                <Image src={"/images/vcc.png"} alt={"logo"} width={100} height={100}></Image>
                <div>
                    <Link href={"/"}>Home</Link>
                    <Link href={"/displayJobs"}>Jobs</Link>
                    <Link href={"/savedJobs"}>Saved</Link>
                </div>
                <div>
                    {session?.user?.email || session?.user?.name } <br />
                    <button onClick={() => handleLogout()}>Sign out</button>
                </div>
            </div>
        );
    }

    return(
        <div className={styles.nav}>
            <Image src={"/images/vcc.png"} alt={"logo"} width={100} height={100}></Image>
            <div>
                <Link href={"/"}>Home</Link>
                <Link href={"/displayJobs"}>Jobs</Link>
                <Link href={"/savedJobs"}>Saved</Link>
            </div>
            <div>
                <Link href={"/login"}>Login</Link>
                <Link href={"/signup"}>Register</Link>
            </div>
        </div>
    );
}