import Navbar from "@/components/navbar";
import { Grid, GridItem } from "@chakra-ui/react";
import styles from "@/styles/displayJobs.module.sass";
import { useState } from "react";
import dynamic from "next/dynamic";
import router from "next/router";

import Button from "@/components/button";
import { getAllProject } from "@/backend/actions/project";
import { getToken } from "next-auth/jwt";
import { Project } from "@/interface/Project";
import ProjectPagination from "@/components/projectPagination";


const Search = dynamic(() => import("@mui/icons-material/Search"));
const AddIcon = dynamic(() => import("@mui/icons-material/Add"));


interface Props {
	name?: string
	projects: Project[]
}

export default function DisplayProjects({ projects, name }: Props) {

	function handleRouteToProjectForm() {
		router.push("/createProject");
	}

	return (
		<div>
			<Navbar />

			<div className={styles.title}>
				<h1>Explore Projects</h1>
			</div>

			<div className={styles.cardContainer}>
				<div className={styles.cardArr} >

					{projects.length <= 0 ?(
						<div className={styles.nocontent}>No Projects have posted yet</div>
					) : (
						<ProjectPagination proj={projects} />
					)}

				</div>
			</div>
		</div>
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

		return {
			props: {
				projects: JSON.parse(JSON.stringify(form.message)),

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
