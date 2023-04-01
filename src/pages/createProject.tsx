import { useRef, useState } from "react";
import styles from "@/styles/createProject.module.sass";
import Input from "@/components/input";
import Image from "next/image";
import dynamic from "next/dynamic";
import { instance } from "@/shared/axiosInstance";
import router from "next/router";
import ErrorAlert from "@/components/ErrorAlert";
import { getToken } from "next-auth/jwt";

const Close = dynamic(() => import("@mui/icons-material/Close"));
const CameraAlt = dynamic(() => import("@mui/icons-material/CameraAlt"));
const LanguageIcon = dynamic(() => import("@mui/icons-material/Language"));
const LinkIcon = dynamic(()=> import("@mui/icons-material/Link"));
const DescriptionIcon = dynamic(() => import("@mui/icons-material/DescriptionOutlined"));



interface Project {
    name: string;
    image: File | null;
    hyperlink: string;
    description: string;
}



export default function CreateProject(project: Project) {
	const [error, setError] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);
	const [disabled, setDisabled] = useState(false);
	const [ form, setForm ] = useState<Project>({
		name: "",
		image: null,
		hyperlink: "",
		description: ""
	});

	const [isLoading, setIsLoading] = useState(false);

	function handleChange (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
		setForm({ ...form,[event.target.name]: event.target.value });
	}

	async function handleImgUpload (event: React.ChangeEvent<HTMLInputElement>){
		const val = event.target.files![0];
		setForm({ ...form, image: val });
	};

	function handleFileClick() {
		inputRef.current?.click();
	}

	function removeImage() {
		setForm({ ...form, image: null });
	}

	function isProjectValid() {
		return (
			form.name !== "" &&
            form.image !== null &&
            form.hyperlink !== "" &&
            form.description !== ""
		);
	}

	async function handleSubmit() {
		setIsLoading(true);
		setDisabled(true);
		const formData = new FormData();
		formData.append("files", form.image!);

		const img = {
			method: "POST",
			url: "cloudinary",
			data: formData
		};

		const { data } = await instance.request(img);
		const { data : { data : { url: url } } } = await instance.post("/cloudinary", formData);


		const project = {
			name: form.name,
			image: url.public_id,
			hyperlink: form.hyperlink,
			description: form.description
		};

		const obj = {
			project
		};

		await instance.post("/project/create", obj);
		setIsLoading(false);
		router.push("/admin/studentPosts");
	}

	return (
		<div className={styles.container}>
			<div className={styles.stepper}>
				<p className={ form ? isProjectValid()
					? styles.selected : styles.error : styles.unselected }>
                        Project Details Information
				</p>
			</div>
			<div className={styles.form}>
				<div className={styles.field}>
					{error && <ErrorAlert message={error}/>}
					<Input
						type="text"
						name="name"
						placeholder="Enter Project Name"
						value={form.name}
						onChangeInput={handleChange}>
						<LanguageIcon sx={{ color: "#84BD00" }}/>
					</Input>

					<Input
						type="text"
						name="hyperlink"
						placeholder="Enter Project Link"
						value={form.hyperlink}
						onChangeInput={handleChange}
					>
						<LinkIcon sx={{ color: "#84BD00" }}/>
					</Input>
					<Input
						type="textarea"
						name="description"
						placeholder="Enter Project Description"
						value={form.description}
						onChangeTextArea={handleChange}
					>
						<DescriptionIcon sx={{ color: "#84BD00" }}/>
					</Input>

                    	<div className={styles.remove} onClick={() => removeImage()}>
						<button>
							<Close />
						</button>
					</div>
					<div className={styles.fileupload} onClick={handleFileClick}>
						<div className={styles.opt}>
							{ form.image ? (
								<Image
									className={styles.img}
									src={URL.createObjectURL(form.image)}
									width={100}
									height={100}
									alt="Image"
								/>
							) : (
								<CameraAlt />
							)
							}
						</div>

						<div style={{ display: "none" }}>
							<input
								type="file"
								ref={inputRef}
								name="companyImage"
								onChange={handleImgUpload}
								accept="image/png, image/jpeg"
							/>
						</div>
					</div>
					<button disabled = {disabled} onClick={() => handleSubmit()}
						className={styles.submit}>Submit</button>
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

		if (token.name !== "Admin") {
			return {
				redirect: {
					destination: "/home",
				}
			};
		}

		return {
			props: {
			}
		};
	} catch (error) {
		return {
			redirect: {
				destination: "/",
			},
		};
	}
}

