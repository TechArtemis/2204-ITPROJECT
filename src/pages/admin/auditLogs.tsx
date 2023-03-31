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
import { JobPosting } from "@/interface/JobPosting";
import { getAllPosting } from "@/backend/actions/jobPosting";
import { getFavorites } from "@/backend/actions/user";
import Sidebar from "@/components/sidebar";
import Searchbar from "@/components/searchbar";

// Dynamic imports
const Search = dynamic(() => import("@mui/icons-material/Search"));
const AddIcon = dynamic(() => import("@mui/icons-material/Add"));

export default function AdminAuditLogsPage() {

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
						<h1>Audit Logs</h1>
					</div>

					<div className={styles.contentItems}>

						{/* TODO: Put Audit Logs in here */}

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

		const form = await getAllPosting();
		const { message: favorites } = await getFavorites(token.email as string);
		if (token.name === "Admin") {
			return {
				props: {
					name: token.name,
					jobPostings: JSON.parse(JSON.stringify(form.message)),
					favorites: JSON.parse(JSON.stringify(favorites))
				},
			};
		}

		return {
			props: {
				jobPostings: JSON.parse(JSON.stringify(form.message)),
				favorites: JSON.parse(JSON.stringify(favorites))
			},
		};
	} catch (error) {
		return {
			redirect: {
				destination: "/",
			},
		};
	}
}