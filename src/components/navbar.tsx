// Third-party imports
import Link from "next/link";
import Image from "next/image";

// Local imports
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
					<p>Explore Jobs</p>
				</Link>
				<Link href={"/savedJobs"}>
					<p>My Jobs</p>
				</Link>
			</div>
			<div>
				<Profile session={{ user: { name: "" } }}/>
			</div>
		</div>
	);
}