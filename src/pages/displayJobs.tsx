// Third-party imports
import { getToken } from "next-auth/jwt";
import { useState } from "react";
import dynamic from "next/dynamic";
import router from "next/router";
import { Grid, GridItem, Input, InputGroup, InputRightElement } from "@chakra-ui/react";

// Local imports
import { getFavorites } from "@/backend/actions/user";
import { getAllPosting } from "@/backend/actions/jobPosting";
import styles from "@/styles/displayJobs.module.sass";
import Navbar from "@/components/navbar";
import Button from "@/components/button";
import Card from "@/components/cards";
import { JobPosting } from "@/interface/JobPosting";

//dynamic imports
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

	const [search, setSearch] = useState("");

	function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
		const val = event.target.value;

		setSearch(val);
	};

	function handleRouteToForm() {
		router.push("/form");
	}

	return (
		<div className={styles.background}>
			<Navbar />
			<div className={styles.container}>
				<div className={styles.search}>
					<input
						type="text"
						placeholder="Search companies, job name, keywords, etc."
						value={search}
						onChange={handleSearch}>
					</input>
					<div className={styles.searchIcon}>
						<Search fontSize="medium" />
					</div>
				</div>
				{
					name === "Admin"
						? <GridItem colSpan={{ sm: 3, md: 1 }}>
							<Button
								type={"button"}
								onClick={() => handleRouteToForm()}
								className={styles.post}>
								<div className={styles.postJobText}>
									<p>Post Job</p>
									<AddIcon fontSize="medium" sx={{ color: "#ffff" }} />
								</div>
							</Button>
						</GridItem>
						:
						<div>

						</div>
				}
			</div>


			{/* <Grid templateColumns="repeat(3, 1fr)" className={styles.searchGrid}>
					<GridItem colSpan={{ sm: 3, md: 2 }}>
						<InputGroup
							className={styles.search}
							alignContent="center">
							<Input
								type={"text"}
								placeholder="Search companies, job name, languages, location, etc." size="sm"
								value={search}
								className={styles.searchInput}
								onChange={handleSearch}
							/>
							<InputRightElement className={styles.searchIcon}>
								<Search fontSize="medium"/>
							</InputRightElement>
						</InputGroup>
					</GridItem>

				</Grid> */}

			<div className={styles.title}>
				<h1>Explore Jobs</h1>
			</div>

			<div className={styles.cardContainer}>
				<div className={styles.cardArr} >

					{(jobPostings.length === 0 && (
						<div className={styles.nocontent}>No Jobs have posted yet</div>
					))}

					<Grid templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(2, 1fr)", "2xl": "repeat(3, 1fr)" }} ml={"5vh"} gap={2}>
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