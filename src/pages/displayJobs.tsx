// Third-party imports
import { getToken } from "next-auth/jwt";
import dynamic from "next/dynamic";
import router from "next/router";
import { GridItem } from "@chakra-ui/react";

// Local imports
import { getFavorites } from "@/backend/actions/user";
import { getAllPosting } from "@/backend/actions/jobPosting";
import styles from "@/styles/displayJobs.module.sass";
import Navbar from "@/components/navbar";
import Button from "@/components/button";
import { JobPosting } from "@/interface/JobPosting";
import JobPagination from "@/components/JobPagination";

// Dynamic imports
const Search = dynamic(() => import("@mui/icons-material/Search"));
const AddIcon = dynamic(() => import("@mui/icons-material/Add"));

/**
 * @param {jobPostings} JobPosting[] - array of job postings
 * @param {favorites} JobPosting[] - array of job postings that are favorited by the user
 *
 */
interface Props {
	name?: string
    jobPostings: JobPosting[]
    favorites: JobPosting[]
}

// This is page is used to display all the jobs posted by the company
export default function DisplayJobs({ jobPostings, favorites, name }: Props) {

	function handleRouteToForm() {
		router.push("/createJob");
	}

	return (
		<div className={styles.background}>
			<Navbar />
			<div className={styles.title}>
				<h1>Explore Jobs</h1>
			</div>

			<div className={styles.cardContainer}>
				<div className={styles.cardArr} >

					{jobPostings.length === 0 ? (
						<div className={styles.nocontent}>No Jobs have posted yet</div>
					) : (
						<JobPagination jobPostings={jobPostings} favorites={favorites} />
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

		const form = await getAllPosting();
		const { message: favorites } = await getFavorites(token.email as string);

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