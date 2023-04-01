import Link from "next/link";
import styles from "@/styles/ErrorPage.module.sass";
import { GetServerSidePropsContext } from "next";
import { getToken } from "next-auth/jwt";

interface Props {
	error: string
	message: string
	type?: "404" | "500" | "400"
}

export default function ErrorPage(props: Props) {
	return (
		<div className={styles.error}>
			<h1>{props.error}</h1>
			<h3>{props.message}</h3>
			<Link className={styles.redirect} href="/home">Go to home page</Link>
		</div>
	);
}

export async function getServerSideProps(context: { [key: string]: any }) {
	try {
		const secret = process.env.NEXTAUTH_SECRET;
		const token = await getToken(
			{
				req: context.req,
				secret: secret
			}
		);

		// If the user is already logged in, redirect.
		// Note: Make sure not to redirect to the same page
		// To avoid an infinite loop!
		if (!token) {
			return { redirect: { destination: "/login", permanent: false } };
		}

		const { errorpage, message } = context.params;

		return {
			props: {
				error: errorpage,
				message: message
			},
		};
	} catch (error) {
		return {
			redirect: {
				destination: "/",
			},
		};
	}
}