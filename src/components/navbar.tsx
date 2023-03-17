//third-party imports
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import router from "next/router";
import Image from "next/image";

// Local Imports
import styles from "@/styles/components.module.sass";


// Navbar component
export default function Navbar() {
    const { data: session } = useSession();

    async function handleLogout() {
        await signOut();
        router.push("/");
    }


    return (
        <div className={styles.nav}>
            <Image src={"/images/vcc.png"} alt={"logo"} width={100} height={100}/>
            <div>
                <Link href={"/home"}>Home</Link>
                <Link href={"/displayJobs"}>Jobs</Link>
                <Link href={"/savedJobs"}>Saved</Link>
            </div>
            <div>
                {session?.user?.email || session?.user?.name} <br />
                <button onClick={() => handleLogout()}>Sign out</button>
            </div>
        </div>
    );
}