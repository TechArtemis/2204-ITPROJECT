import { ReactNode, useState } from "react";
import ProjectCards from "./projectCards";
import styles from "@/styles/components.module.sass";
import dynamic from "next/dynamic";
import { Project } from "@/interface/Project";

const Search = dynamic(() => import("@mui/icons-material/Search"));

interface Proj {
	id: string,
	name: string,
	image: string,
	hyperlink: string,
	description: string,
	children?: ReactNode;
}

interface Props {
	proj: Project[]

}


export default function ProjectPagination({ proj }: Props) {
	const [currentPage, setCurrentPage] = useState(1);
	const [projectsPerPage] = useState(2);

	const [search, setSearch] = useState("");

	function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
		const val = event.target.value;
		setSearch(val);
		setCurrentPage(1); // reset the current page when the search term changes
	}

	const filteredProjects = proj.filter(
		(project) =>
			project.name.toLowerCase().includes(search.toLowerCase()) ||
			project.description.toLowerCase().includes(search.toLowerCase())
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

				<div className={styles.cardsProject}>
					{currentProjects.map((post: Project, idx) => (
						<ProjectCards
							key={idx}
							id={post._id as string}
							image={post.image}
							name={post.name}
							hyperlink={post.hyperlink}
							description={post.description}
						/>
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