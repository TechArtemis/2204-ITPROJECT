// Third-party imports
import dynamic from "next/dynamic";
import { useState } from "react";
import router from "next/router";
import { Grid, GridItem } from "@chakra-ui/react";
import Button from "@/components/button";

// Local imports
import styles from "@/styles/admin.module.sass";

// Dynamic imports
const Search = dynamic(() => import("@mui/icons-material/Search"));
const AddIcon = dynamic(() => import("@mui/icons-material/Add"));

interface Props {
    isJobsPage?: boolean
}

// Navbar component
export default function Searchbar(props: Props) {

	const [search, setSearch] = useState("");

	function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
		const val = event.target.value;

		setSearch(val);
	};

	function handleRouteToForm() {
		router.push("/createJobs");
	}

	function handleRouteToProject() {
		router.push("/createProject");
	}

	return (
		<>
			<Grid
				templateRows={{ sm: "repeat(2, 1fr)", xl: "repeat(1, 1fr)" }}
				templateColumns={{ sm: "repeat(1, 1fr)", xl: "repeat(2, 1fr)" }}
				gap={5}>
				<GridItem rowSpan={2}>
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
				</GridItem>

				<GridItem>
					{props.isJobsPage ? (
						<Button
							type={"button"}
							onClick={() => handleRouteToForm()}
							className={styles.postJob}>
							<div className={styles.postItemText}>
								<p>Add Job</p>
								<AddIcon fontSize="large" sx={{ color: "#ffffff" }} />
							</div>
						</Button>
					) : (
						<Button
							type={"button"}
							onClick={() => handleRouteToProject()}
							className={styles.postProject}>
							<div className={styles.postItemText}>
								<p>Add Project</p>
								<AddIcon fontSize="large" sx={{ color: "#ffffff" }} />
							</div>
						</Button>
					)}
				</GridItem>
			</Grid>
		</>
	);
}