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

/**
 * @param {jobPostings} JobPosting[] - array of job postings
 *
 */
interface Props {
    data: JobPosting[]
}


export default function SavedJobs({ data }: Props) {

	const [jobs, setJobs] = useState<JobPosting[]>(data);

	return (
		<div className={styles.background}>
			<Navbar />
			<div>

				<div className={styles.title}>
					<h1>Saved Jobs</h1>
				</div>

				<div className={styles.cardArr}>

					{(jobs.length === 0 && (
						<div className={styles.nocontent}>No Jobs have been saved yet</div>
					))}
					<Grid templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(2, 1fr)", "2xl": "repeat(3, 1fr)" }} ml={"5vh"} gap={2}>
						{jobs.map((post: JobPosting, idx) => (
							<div key={idx} className={styles.cardWrapper}>
								<Card
									image={post.companyImage}
									name={post.companyName}
									tags={post.tags}
									address={post.companyLocation[0].location.city}
									job={post.jobTitle}
									type={post.jobType} id={post._id as string}
									extraFunction={(jobPosting) => {
										console.info("here");
										setJobs([...jobs.filter(job => job._id !== jobPosting)]);
									}}
									liked
								/>
							</div>
						))}
					</Grid>
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