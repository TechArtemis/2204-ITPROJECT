import styles from "@/styles/components.module.sass";

 interface Props {
    message: string;
}

export default function ErrorAlert(props: Props) {
	return (
		<div className={styles.error}>
			<p>{props.message}</p>
		</div>
	);
}