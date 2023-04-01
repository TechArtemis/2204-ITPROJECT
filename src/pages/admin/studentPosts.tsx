// Third-party imports
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useState } from "react";
import router from "next/router";
import { Button, Grid } from "@chakra-ui/react";
import { getToken } from "next-auth/jwt";

// Local imports
import styles from "@/styles/admin.module.sass";
import Sidebar from "@/components/sidebar";
import Searchbar from "@/components/searchbar";
import { Project } from "@/interface/Project";
import ProjectCards from "@/components/projectCards";
import { getAllProject } from "@/backend/actions/project";

// Dynamic imports
const Search = dynamic(() => import("@mui/icons-material/Search"));
const AddIcon = dynamic(() => import("@mui/icons-material/Add"));

interface Props {
	projectPosts: Project[]
}

export default function AdminStudentPage(props: Props) {

	const [search, setSearch] = useState("");

	function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
		const val = event.target.value;

		setSearch(val);
	};

	function handleRouteToForm() {
		router.push("/form");
	}

	return (
		<>
			<div className={styles.container}>
				<div className={styles.sidebarContainer}>
					<Sidebar isStudentPage/>
				</div>

				<div className={styles.contentContainer}>
					<div className={styles.contentTitle}>
						<h1>Student Projects</h1>
					</div>

					<div className={styles.searchContainer}>
						<Searchbar/>
					</div>

					<div className={styles.contentItems}>

						<Grid templateColumns={{ sm: "repeat(1, 1fr)", xl: "repeat(2, 1fr)" }} ml={"5vh"} gap={2}>
							{props.projectPosts.map((post: Project, idx) => (
								<ProjectCards
									key={idx}
									id={post._id as string}
									image={post.image}
									name={post.name}
									hyperlink={post.hyperlink}
									description={post.description}
								/>
							))}
						</Grid>
					</div>
				</div>
			</div>
		</>
	);
}

export async function getServerSideProps(context: { [key: string]: any }) {
	try {
		const secret = process.env.NEXTAUTH_SECRET;
		const token = await getToken(
			{
				req: context.req,
				secret: secret
			}
		);

		// If the user is already logged in, redirect.
		// Note: Make sure not to redirect to the same page
		// To avoid an infinite loop!
		if (!token) {
			return { redirect: { destination: "/login", permanent: false } };
		}

		const form = await getAllProject();
		if (token.name === "Admin") {
			return {
				props: {
					name: token.name,
					projectPosts: JSON.parse(JSON.stringify(form.message))
				},
			};
		}

		return {
			redirect: {
				destination: "/home",
				permanent: false
			}
		};
	} catch (error) {
		return {
			redirect: {
				destination: "/",
			},
		};
	}
}