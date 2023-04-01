import styles from "@/styles/components.module.sass";
import dynamic from "next/dynamic";

const ErrorIcon = dynamic(() => import("@mui/icons-material/Error"));
const SuccessIcon = dynamic(() => import("@mui/icons-material/CheckCircle"));
const WarningIcon = dynamic(() => import("@mui/icons-material/Warning"));
const LoadingIcon = dynamic(() => import("@mui/icons-material/RotateLeftRounded"));



interface Props {
	message: string;
	type?: "success" | "error" | "loading" | "warning";
}

export default function ErrorAlert(props: Props) {
	return (
		<div className={styles.alert}>
			{props.type === "success" ? (
				<div className={styles.success}>
					<SuccessIcon className={styles.successicon} sx={{ color:"#6AD0A1" }} fontSize={"large"}/>
					<p>{props.message}</p>
				</div>
			) : props.type === "loading" ? (
				<div className={styles.loading}>
					<LoadingIcon className={styles.loadingicon} sx={{ color:"#5ECDE6" }} fontSize={"large"}/>
					<p>{props.message}</p>
				</div>
			) : props.type === "warning" ? (
				<div className={styles.warning}>
					<WarningIcon className={styles.warningicon} sx={{ color:"#F5C350" }} fontSize={"large"}/>
					<p>{props.message}</p>
				</div>
			) : (
				<div className={styles.error}>
					<ErrorIcon className={styles.erroricon} sx={{ color:"#DF5965" }} fontSize={"large"}/>
					<p>{props.message}</p>
				</div>
				 )}
		</div>
	);
}



