//third-party imports
import Link from "next/link";
import router, { useRouter } from "next/router";
import Image from "next/image";

// Local Imports
import styles from "@/styles/components.module.sass";
import Profile from "@/components/profile";

// Navbar component
export default function Navbar() {
    return (
        <div className={styles.nav}>
            <Image src={"/images/vcc.png"} alt={"logo"} width={100} height={100}/>
            <div>
                <Link href={"/home"}>
                    <p>Home</p>
                </Link>
                <Link href={"/displayJobs"}>
                    <p>Jobs</p>
                </Link>
                <Link href={"/savedJobs"}>
                    <p>Saved</p>
                </Link>
            </div>
            <div>
                <Profile session={{ user: { name: "" } }}/>
            </div>
        </div>
    );
}