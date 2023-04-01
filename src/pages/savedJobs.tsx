// Third-party imports
import { getToken } from "next-auth/jwt";
import { useState } from "react";
import { Grid } from "@chakra-ui/react";

// Local imports
import { getFavorites } from "@/backend/actions/user";
import Card from "@/components/cards";
import Navbar from "@/components/navbar";
import { JobPosting } from "@/interface/JobPosting";
import styles from "@/styles/displayJobs.module.sass";
import SavedPagination from "@/components/SavedPagination";

/**
 * @param {jobPostings} JobPosting[] - array of job postings
 *
 */
interface Props {
    data: JobPosting[]
}


export default function SavedJobs({ data }: Props) {

	return (
		<div className={styles.background}>
			<Navbar />
			<div>

				<div className={styles.title}>
					<h1>Saved Jobs</h1>
				</div>

				<div className={styles.cardArr}>

					{data.length === 0 ? (
						<div className={styles.nocontent}>No Saved Jobs yet</div>
					) : (
						<SavedPagination data={data}/>
					)}
				</div>
			</div>
		</div>
	);
};

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

		const form = await getFavorites(token.email as string);

		return {
			props: {
				data: JSON.parse(JSON.stringify(form.message))
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