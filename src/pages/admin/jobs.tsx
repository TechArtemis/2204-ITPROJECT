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
import Card from "@/components/cards";
import { getAllPosting } from "@/backend/actions/jobPosting";
import { getFavorites } from "@/backend/actions/user";
import Sidebar from "@/components/sidebar";
import Searchbar from "@/components/searchbar";

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

export default function AdminJobsPage({ jobPostings, favorites, name }: Props) {

	const [search, setSearch] = useState("");

	function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
		const val = event.target.value;

		setSearch(val);
	};

	return (
		<>
			<div className={styles.container}>
				<div className={styles.sidebarContainer}>
					<Sidebar isJobsPage/>
				</div>

				<div className={styles.contentContainer}>
					<div className={styles.contentTitle}>
						<h1>Posted Jobs</h1>
					</div>

					<div className={styles.searchContainer}>
						<Searchbar isJobsPage/>
					</div>

					<div className={styles.contentItems}>

						{(jobPostings.length === 0 && (
							<div className={styles.nocontent}>No Jobs have posted yet</div>
						))}

						<Grid templateColumns={{ sm: "repeat(1, 1fr)", xl: "repeat(2, 1fr)" }} ml={"5vh"} gap={2}>
							{jobPostings.filter((card) => card.companyName.toLowerCase().includes(search.toLowerCase())
                        || card.jobTitle.toLowerCase().includes(search.toLowerCase())
                        || card.companyLocation[0].location.city.toLowerCase().includes(search.toLowerCase())
                        || card.jobType.toLowerCase().includes(search.toLowerCase())
                        || card.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase())))

								.map((post: JobPosting, idx) => (
									<div key={idx} className={styles.cardWrapper}>
										<Card
											image={post.companyImage}
											name={post.companyName}
											tags={post.tags}
											address={post.companyLocation[0].location.city}
											job={post.jobTitle}
											type={post.jobType} id={post._id as string}
											liked={favorites.filter((fav => fav._id as string === post._id as string)).length === 1}
										/>
									</div>
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