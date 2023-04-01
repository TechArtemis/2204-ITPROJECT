// Third-party imports
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

// Local imports
import styles from "@/styles/admin.module.sass";

// Dynamic imports
const BusinessCenterOutlinedIcon = dynamic(() => import("@mui/icons-material/BusinessCenterOutlined"));
const LanguageOutlinedIcon = dynamic(() => import("@mui/icons-material/LanguageOutlined"));
const ArticleOutlinedIcon = dynamic(() => import("@mui/icons-material/ArticleOutlined"));

interface Props {
    isJobsPage?: boolean
    isStudentPage?: boolean
    isAuditPage?: boolean
}

// Navbar component
export default function Sidebar(props: Props) {
	return (
		<>
			<Image src={"/images/vcc.png"} alt={"logo"} width={140} height={140} unoptimized={true}/>
			<div className={styles.sidebarItems}>
				<div className={styles.mainMenu}>
					<h1>Main Menu</h1>
				</div>

				<Link href={"/admin/jobs"}>
					{props.isJobsPage ? (
						<div className={`${styles.jobs} ${styles.jobsClicked}`}>
							<BusinessCenterOutlinedIcon fontSize="large" sx={{ color: "#000000" }} />
							<h1>Jobs</h1>
						</div>
					) : (
						<div className={styles.jobs}>
							<BusinessCenterOutlinedIcon fontSize="large" sx={{ color: "#000000" }} />
							<h1>Jobs</h1>
						</div>
					)}
				</Link>

				<Link href={"/admin/studentPosts"}>
					{props.isStudentPage ? (
						<div className={`${styles.studentProjects} ${styles.studentProjectsClicked}`}>
                        	<LanguageOutlinedIcon fontSize="large" sx={{ color: "#000000" }} />
                        	<h1>Students Projects</h1>
						</div>
					) : (
						<div className={styles.studentProjects}>
							<LanguageOutlinedIcon fontSize="large" sx={{ color: "#000000" }} />
							<h1>Students Projects</h1>
						</div>
					)}
				</Link>

				<Link href={"/admin/auditLogs"}>
					{props.isAuditPage ? (
						<div className={`${styles.auditLogs} ${styles.auditLogsClicked}`}>
                        	<ArticleOutlinedIcon fontSize="large" sx={{ color: "#000000" }} />
                        	<h1>Audit Logs</h1>
						</div>
					) : (
						<div className={styles.auditLogs}>
							<ArticleOutlinedIcon fontSize="large" sx={{ color: "#000000" }} />
							<h1>Audit Logs</h1>
						</div>
					)}
				</Link>

			</div>
		</>
	);
}