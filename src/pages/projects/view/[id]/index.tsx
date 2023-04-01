import { getProject } from "@/backend/actions/project";
import Navbar from "@/components/navbar";
import { instance } from "@/shared/axiosInstance";
import { getToken } from "next-auth/jwt";
import dynamic from "next/dynamic";
import router from "next/router";
import Image from "next/image";
import styles from "@/styles/projectView.module.sass";

//dynamic imports
const Edit = dynamic(() => import("@mui/icons-material/Edit"));
const Delete = dynamic(() => import("@mui/icons-material/Delete"));

export default function ViewProject({ onSubmit, data, name }: any) {
	async function handleDelete(id: string) {
		try {
			const res = await instance.delete(`/project/${id}`);
			if (res.status === 200) {
				router.push("/displayProjects");
			}

		} catch (error: any) {
			console.log(error);
		}
	}

	return (
		<div>
			<Navbar />
			<div className={styles.submitform}>
				<div className={styles.imgcontent}>
					{data.image ? (
						<Image
							className={styles.img}
							src={`https://res.cloudinary.com/di8zlg2gt/image/upload/${data.image}`}
							width={85}
							height={85}
							alt="Image"
							unoptimized={true}
						/>
					) : (
						<Image

							className={styles.img}
							src={"/images/imageplaceholder.png"}
							alt={"image"}
							width={85}
							height={85}
						/>
					)}
				</div>

				<div className={styles.content}>

					<div className={styles.title}>
						<div>
							<h1>{data.name}</h1>
						</div>
						{
							name === "Admin"
								?
								<>
									<div className={styles.button1}>
										<button onClick={() => handleDelete(data._id as string)}>
											<Delete sx={{ color: "#DF5965" }} fontSize={"large"} />
										</button>
									</div>
								</>
								:
								<></>
						}
					</div>

					<h2><a href={`https://${data.hyperlink}`} target="_blank" rel="noopener noreferrer">{data.hyperlink}</a></h2>
					<h3>{data.description}</h3>
				</div>
			</div>


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

		const { id } = context.params;
		const form = await getProject(id);
		if (token.name === "Admin") {
			return {
				props: {
					name: token.name,
					data: JSON.parse(JSON.stringify(form.message)),
				},
			};
		}


		return {
			props: {
				data: JSON.parse(JSON.stringify(form.message)),
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