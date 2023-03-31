import { ReactNode, useState } from "react";
import styles from "@/styles/components.module.sass";
import dynamic from "next/dynamic";
import { JobPosting } from "@/interface/JobPosting";
import Card from "./cards";

const Search = dynamic(() => import("@mui/icons-material/Search"));

interface Props {
	name?: string
    jobPostings: JobPosting[]
    favorites: JobPosting[]
}

// interface Props {
//     jobs: Job
// }
export default function JobPagination({ name, jobPostings, favorites }: Props) {
	const [currentPage, setCurrentPage] = useState(1);
	const [projectsPerPage] = useState(3);

	const [search, setSearch] = useState("");

	function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
	  const val = event.target.value;
	  setSearch(val);
	  setCurrentPage(1);
	}


	const filteredProjects = jobPostings.filter((job) =>
		job.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
        job.companyName.toLowerCase().includes(search.toLowerCase())
        || job.companyLocation[0].location.city.toLowerCase().includes(search.toLowerCase())
        || job.jobType.toLowerCase().includes(search.toLowerCase())
        || job.tags.some (tag => tag.toLowerCase().includes(search.toLowerCase()))

	);

	const indexOfLastProject = currentPage * projectsPerPage;
	const indexOfFirstProject = indexOfLastProject - projectsPerPage;

	const currentProjects = filteredProjects.slice(
		indexOfFirstProject,
		indexOfLastProject
	);


	const handlePageChange = (
	  event: React.ChangeEvent<unknown>,
	  value: number
	) => {
	  setCurrentPage(value);
	};

	const pageCounter = Math.ceil(filteredProjects.length / projectsPerPage);


	return (
		<div className={styles.pagination}>
			<div>

				<div className={styles.jobsearch}>
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

				<div className={styles.jobCards}>
					{currentProjects.map((job, idx) => (
						<Card
							key={idx}
							image={job.companyImage}
							id={job._id as string}
							name={job.companyName}
							address={job.companyLocation[0].location.city}
							job={job.jobTitle}
							type={job.jobType}
							liked={favorites.filter((fav => fav._id as string === job._id as string)).length === 1} tags={job.tags}/>
					))}
				</div>
			</div>
			<div className={styles.page}>
		  {Array.from(Array(pageCounter).keys()).map((page) => (
					<button
			  key={page}
			  onClick={(event) => handlePageChange(event, page + 1)}
					>
			  {page + 1}
					</button>
		  ))}
			</div>
	  </div>
	);
}
