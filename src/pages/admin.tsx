// Third-party imports
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useState } from "react";
import router from "next/router";

// Local imports
import styles from "@/styles/admin.module.sass";
import { Button } from "@chakra-ui/react";

// Dynamic imports
const BusinessCenterOutlinedIcon = dynamic(() => import("@mui/icons-material/BusinessCenterOutlined"));
const LanguageOutlinedIcon = dynamic(() => import("@mui/icons-material/LanguageOutlined"));
const ArticleOutlinedIcon = dynamic(() => import("@mui/icons-material/ArticleOutlined"));
const Search = dynamic(() => import("@mui/icons-material/Search"));
const AddIcon = dynamic(() => import("@mui/icons-material/Add"));

export default function AdminPage() {

	const [search, setSearch] = useState("");

	function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
		const val = event.target.value;

		setSearch(val);
	};

	function handleRouteToForm() {
		router.push("/form");
	}

	return (
		<>
			<div className={styles.container}>
				<div className={styles.sidebarContainer}>
					<Image src={"/images/vcc.png"} alt={"logo"} width={140} height={140}/>

					<div className={styles.sidebarItems}>

						<div className={styles.mainMenu}>
							<h1>Main Menu</h1>
						</div>

						<div className={styles.jobs}>
							<BusinessCenterOutlinedIcon fontSize="large" sx={{ color: "#000000" }}/>
							<h1>Jobs</h1>
						</div>

						<div className={styles.studentProjects}>
							<LanguageOutlinedIcon fontSize="large" sx={{ color: "#000000" }}/>
							<h1>Students Projects</h1>
						</div>

						<div className={styles.auditLogs}>
							<ArticleOutlinedIcon fontSize="large" sx={{ color: "#000000" }}/>
							<h1>Audit Logs</h1>
						</div>
					</div>
				</div>

				<div className={styles.contentContainer}>
					<div className={styles.contentTitle}>
						<h1>Student Projects</h1>
					</div>

					<div className={styles.searchContainer}>
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

						<Button
							type={"button"}
							onClick={() => handleRouteToForm()}
							className={styles.post}>
							<div className={styles.postJobText}>
								<p>Add Project</p>
								<AddIcon fontSize="large" sx={{ color: "#ffffff" }} />
							</div>
						</Button>
					</div>
				</div>
			</div>
		</>
	);
}