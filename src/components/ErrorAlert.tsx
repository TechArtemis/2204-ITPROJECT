import styles from "@/styles/components.module.sass";
import dynamic from "next/dynamic";

const ErrorIcon = dynamic(() => import("@mui/icons-material/Error"));

interface Props {
	message: string;
	type?: "success" | "error" | "loading" | "warning";
}

export default function ErrorAlert(props: Props) {
	return (
		<div className={styles.alert}>
			<div className={styles.message}>
				<ErrorIcon className={styles.erroricon} sx={{ color:"#DF5965" }} fontSize={"large"}/>
				<p>{props.message}</p>
			</div>
		</div>
	);

}

