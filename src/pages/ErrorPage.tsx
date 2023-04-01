import Link from "next/link";
import styles from "@/styles/ErrorPage.module.sass";


export default function ErrorPage() {
	return (
		<div className={styles.error}>
			<h1>404</h1>
			<h3>Page not found</h3>
			<Link className={styles.redirect} href="/home">Go to home page</Link>
		</div>
	);
}
