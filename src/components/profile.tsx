// Third-party imports
import { signOut, useSession } from "next-auth/react";
import router from "next/router";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

// Local imports
import styles from "@/styles/components.module.sass";

interface Props {
    session: {
		user: {
			name: string
		}
    }
}

export default function Profile(props: Props) {
	const { data: session } = useSession();

	async function handleLogout() {
		await signOut();
		router.push("/");
	}

	const firstLetter = typeof session?.user?.name === "string" && session?.user?.name.length > 0 ? session?.user?.name.charAt(0).toUpperCase() : "";

	return (
		<div className={styles.container}>
			<Menu>
				<MenuButton>
    				<div className={styles.logo}>
						{firstLetter}
					</div>
				</MenuButton>
				<MenuList minW="180px">
					<MenuItem onClick={handleLogout} color="black">
						Sign out
					</MenuItem>
				</MenuList>
			</Menu>
		</div>
	);
}