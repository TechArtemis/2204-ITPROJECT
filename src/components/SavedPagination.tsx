import { ReactNode, useState } from "react";
import styles from "@/styles/components.module.sass";
import dynamic from "next/dynamic";
import { JobPosting } from "@/interface/JobPosting";
import Card from "./cards";

const Search = dynamic(() => import("@mui/icons-material/Search"));

interface Props {
    data: JobPosting[]
}


export default function JobPagination({ data }: Props) {
	const [currentPage, setCurrentPage] = useState(1);
	const [projectsPerPage] = useState(3);

	const [jobs, setJobs] = useState<JobPosting[]>(data);

	const indexOfLastProject = currentPage * projectsPerPage;
	const indexOfFirstProject = indexOfLastProject - projectsPerPage;

	const currentProjects = data.slice(
		indexOfFirstProject,
		indexOfLastProject
	);

	const handlePageChange = (
	  event: React.ChangeEvent<unknown>,
	  value: number
	) => {
	  setCurrentPage(value);
	};

	const pageCounter = Math.ceil(data .length / projectsPerPage);


	return (
		<div className={styles.pagination}>
			<div>
				<div className={styles.jobCards}>
					{currentProjects.map((post: JobPosting, idx) => (
						<Card
							key={idx}
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
							liked/>
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
