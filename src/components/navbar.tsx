// Third-party imports
import Image from "next/image";
import dynamic from "next/dynamic";
import { Menu, MenuItem, MenuList, Link, MenuButton, Spacer } from "@chakra-ui/react";
import NextLink from "next/link";
import router from "next/router";

// Local imports
import styles from "@/styles/components.module.sass";
import Profile from "@/components/profile";
import { signOut } from "next-auth/react";

const MenuIcon = dynamic(() => import("@mui/icons-material/Menu"));

// Navbar component
export default function Navbar() {

	async function handleLogout() {
		await signOut();
		router.push("/");
	}

	return (
		<div>
			<div className={styles.menuButton}>
				<Menu>
					<MenuButton>
						<MenuIcon fontSize="large" sx={{ color: "black" }} />
					</MenuButton>

					<MenuList>
						<Link as={NextLink} href='/home'>
							<MenuItem color="black">
							Home
							</MenuItem>
						</Link>

						<Link as={NextLink} href='/displayJobs'>
							<MenuItem color="black">
							Explore Jobs
							</MenuItem>
						</Link>

						<Link as={NextLink} href='/displayProjects'>
							<MenuItem color="black">
							Student Projects
							</MenuItem>
						</Link>

						<Link as={NextLink} href='/savedJobs'>
							<MenuItem color="black">
							My Jobs
							</MenuItem>
						</Link>

						<Link as={NextLink} href='/savedJobs'>
							<MenuItem onClick={handleLogout} color="black">
								Sign out
							</MenuItem>
						</Link>
					</MenuList>
				</Menu>

				<Spacer/>

				<Image src={"/images/vcc.png"} alt={"logo"} width={100} height={100}/>

			</div>


			<div className={styles.nav}>
				<div className={styles.navItems}>
					<Image src={"/images/vcc.png"} alt={"logo"} width={100} height={100}/>
				</div>

				<div className={styles.navItems}>
					<Link href={"/home"}>
						<p>
							Home
						</p>
					</Link>
					<Link href={"/displayJobs"}>
						<p>
							Explore Jobs
						</p>
					</Link>
					<Link href={"/displayProjects"}>
						<p>
							Student Projects
						</p>
					</Link>
					<Link href={"/savedJobs"}>
						<p>
							My Jobs
						</p>
					</Link>
				</div>

				<div className={styles.navItems}>
					<Profile session={{ user: { name: "" } }}/>
				</div>
			</div>
		</div>
	);
}