// Third-party imports
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

// Local imports
import styles from "@/styles/components.module.sass";
import Profile from "@/components/profile";

const MenuIcon = dynamic(() => import("@mui/icons-material/Menu"));


// Navbar component
export default function Navbar() {
	return (
		<div className={styles.nav}>
			<Image src={"/images/vcc.png"} alt={"logo"} width={100} height={100}/>
			<div>
				<Link href={"/home"}>
					<p className={styles.content}>Home</p>
				</Link>
				<Link href={"/displayJobs"}>
					<p className={styles.content}>Jobs</p>
				</Link>
				<Link href={"/savedJobs"}>
					<p className={styles.content}>Saved</p>
				</Link>
			</div>
			<div>
				<Profile session={{ user: { name: "" } }}/>
			</div>
		</div>
	);
}