// Third-party imports
import React, { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import router from "next/router";

// Local imports
import styles from "@/styles/form.module.sass";
import Button from "@/components/button";
import Input from "@/components/input";
import { Location } from "@/interface/Location";
import SelectOption from "@/components/dropdown";
import { JobPosting } from "@/interface/JobPosting";
import { instance } from "@/shared/axiosInstance";
import { getToken } from "next-auth/jwt";

// Dynamic imports
const BusinessIcon = dynamic(() => import("@mui/icons-material/BusinessRounded"));
const EmailIcon = dynamic(() => import("@mui/icons-material/EmailOutlined"));
const LocationOnIcon = dynamic(() => import("@mui/icons-material/LocationOnOutlined"));
const LocationCityIcon = dynamic(() => import("@mui/icons-material/LocationCity"));
const LandscapeIcon = dynamic(() => import("@mui/icons-material/LandscapeOutlined"));
const MarkunreadMailboxIcon = dynamic(() => import("@mui/icons-material/MarkunreadMailboxOutlined"));
const DescriptionIcon = dynamic(() => import("@mui/icons-material/DescriptionOutlined"));
const PersonSearchIcon = dynamic(() => import("@mui/icons-material/PersonSearch"));
const WorkIcon = dynamic(() => import("@mui/icons-material/Work"));
const CameraAlt = dynamic(() => import("@mui/icons-material/CameraAlt"));
const Close = dynamic(() => import("@mui/icons-material/Close"));
const LinkIcon = dynamic(()=> import("@mui/icons-material/Link"));

/**
 * @param {string} companyImage - logo of the company
 * @param {string} companyName - name of the company
 * @param {string} companyContact - contact of the company
 * @param {string} companyLocation - location of the company
 * @param {string} companyAbout - about the company
 * @param {string} jobTitle - title of the job
 * @param {string} jobType - type of the job
 * @param {string} employment - employment of the job
 * @param {string} jobDescription - description of the job
 * @param {string} tags - tags of the job
 */

//interface for the form
interface CompanyJob {
    companyImage: File | null;
    companyName: string;
    companyContact: string;
	companyLink: string;
    companyLocation: {
        address: string;
        city: string;
        province: string;
        postalCode: string;
    },
    companyAbout: string,
    jobTitle: string;
    jobType: string;
    employment: string;
    jobDescription: string;
    tags: string
}

//interface for province
interface Province {
    value: keyof typeof Location.Province;
    label: string;
}

//interface for job type
interface JobType {
    value: keyof typeof JobPosting.JobTitleType;
    label: string;
}

//interface for employment
interface Employment {
    value: keyof typeof JobPosting.JobTitleType;
    label: string;
}

//functions for the form pages
function CompanyPostInfo({ onSubmit, item }: any) {
	const inputRef = useRef<HTMLInputElement>(null);
	const options: Province[] = Object.keys(Location.Province).map(key => {
		return {
			value: key,
			label: Location.Province[key as keyof typeof Location.Province]
		};
	}) as Province[];


	function handleChange(event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) {
		onSubmit({ ...item, [event.target.name]: event.target.value });
	}

	function handleCompanyLocation(event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>) {
		onSubmit({ ...item, companyLocation: { ...item.companyLocation, [event.target.name]: event.target.value } });
	}

	function handleRouteToJobs() {
		router.push("/displayJobs");
	}

	async function handleImgUpload (event: ChangeEvent<HTMLInputElement>){
		const val = event.target.files?.[0];
		onSubmit({ ...item, companyImage: val });
	};

	function handleFileClick() {
		inputRef.current?.click();
	}

	function removeImage() {
		onSubmit({ ...item, companyImage: null });
	}

	return (
		<div className={styles.container}>
			<div className={styles.form}>
				<div className={styles.field}>
					<div className={styles.remove} onClick={() => removeImage()}>
						<button>
							<Close />
						</button>
					</div>
					<div className={styles.fileupload} onClick={handleFileClick}>
						<div className={styles.opt}>
							{ item.companyImage ? (
								<Image
									className={styles.img}
									src={URL.createObjectURL(item.companyImage)}
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



					<Input
						type="text"
						placeholder="Enter your company name"
						name="companyName" value={item.companyName}
						onChangeInput={handleChange}>
						<BusinessIcon sx={{ color: "#84BD00" }}/>
					</Input>
					<Input
						type="text"
						placeholder="Enter your contact email"
						name="companyContact" value={item.companyContact}
						onChangeInput={handleChange} >
						<EmailIcon sx={{ color: "#84BD00" }}/>
					</Input>
					<Input
						type="text"
						placeholder="Enter your company link"
						name="companyLink" value={item.companyLink}
						onChangeInput={handleChange} >
						<LinkIcon sx={{ color: "#84BD00" }}/>
					</Input>
					<Input
						type="text"
						placeholder="Enter your street address"
						name="address" value={item.companyLocation.address}
						onChangeInput={handleCompanyLocation}>
						<LocationOnIcon sx={{ color: "#84BD00" }}/>
					</Input>
					<Input
						type="text"
						placeholder="Enter your city"
						name="city" value={item.companyLocation.city}
						onChangeInput={handleCompanyLocation}>
						<LocationCityIcon sx={{ color: "#84BD00" }}/>
					</Input>
					<Input
						type="text"
						placeholder="Enter your postal code"
						name="postalCode" value={item.companyLocation.postalCode}
						onChangeInput={handleCompanyLocation}>
						<MarkunreadMailboxIcon sx={{ color: "#84BD00" }}/>
					</Input>
					<SelectOption
						name="province"
						value={item.companyLocation.province}
						onChange={handleCompanyLocation}
						options={options}>
						<LandscapeIcon sx={{ color: "#84BD00" }}/>
					</SelectOption>
					<Input
						type="textarea"
						placeholder="Enter your Description"
						name="companyAbout" value={item.companyAbout}
						rows={6}
						onChangeTextArea={handleChange}>
						<DescriptionIcon sx={{ color: "#84BD00" }}/>
					</Input>
				</div>
				<Button
					type="button"
					onClick={ () => onSubmit(item, true)}
					className={styles.submit}>
                    Next
				</Button>
				<div className={styles.back}>
					<Button
						type="button"
						onClick={() => handleRouteToJobs()}
						className={styles.backbutton}>
                        Return to home
					</Button>
				</div>
			</div>
		</div>
	);
};

function JobPostInfo({ onSubmit, item }: any) {
	const jobTypeOptions: JobType[] = Object.keys(JobPosting.JobTitleType).map(key => {
		return {
			value: key,
			label: JobPosting.JobTitleType[key as keyof typeof JobPosting.JobTitleType]
		};
	}) as JobType[];

	const employmentOptions: Employment[] = Object.keys(JobPosting.EmploymentType).map(key => {
		return {
			value: key,
			label: JobPosting.EmploymentType[key as keyof typeof JobPosting.EmploymentType]
		};
	}) as Employment[];

	function handleChange(event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>) {
		onSubmit({ ...item, [event.target.name]: event.target.value });
	}

	return (
		<form className={styles.container}>
			<div className={styles.form}>
				<div className={styles.field}>
					<Input
						type="text"
						label="Job Title"
						placeholder="Job Title"
						name="jobTitle" value={item.jobTitle}
						onChangeInput={handleChange}>
						<BusinessIcon sx={{ color: "#84BD00" }} />
					</Input>
					<SelectOption
						name="jobType"
						value={item.jobType}
						onChange={handleChange}
						options={jobTypeOptions}
					>
						<PersonSearchIcon sx={{ color: "#84BD00" }} />
					</SelectOption>
					<SelectOption
						name="employment"
						value={item.employment}
						onChange={handleChange}
						options={employmentOptions}
					>
						<WorkIcon sx={{ color: "#84BD00" }} />
					</SelectOption>
					<Input
						type="text"
						placeholder="Enter tags"
						name="tags"
						value={item.tags}
						onChangeInput={handleChange}
					/>
					<Input
						type="textarea"
						placeholder="Enter your Description"
						name="jobDescription" value={item.jobDescription}
						rows={8}
						onChangeTextArea={handleChange}
					>
						<DescriptionIcon sx={{ color: "#84BD00" }} />
					</Input>
				</div>
				<Button
					type="button"
					onClick={() => onSubmit(item,true)}
					className={styles.submit}>
                    Next
				</Button>
			</div>
		</form>
	);
};

function PostCoop({ onSubmit, item }: any) {
	const [value, setValue] = useState(1);

	return (
		<div>
			<div className={styles.submitform}>
				<div className={styles.header}>
					{ item.companyImage ? (
						<Image
							className={styles.logo}
							src={URL.createObjectURL(item.companyImage)}
							width={85}
							height={85}
							alt="Image"
						/>
					) : (
						<Image
							className={styles.logo}
							src={"/images/imageplaceholder.png"}
							alt={"image"}
							width={85}
							height={85}
						/>

					)
					}
					<div className={styles.subheader}>
						<div>
							<h1>{item.companyName}</h1>
							<p>{item.companyLocation.city}</p>
						</div>
					</div>
				</div>
				<div className={styles.content}>
					<div className={styles.subcontent}>
						{value === 1 ?
							<button className={styles.clickedButton} onClick={() => setValue(1)}>Overview</button>
							:
							<button onClick={() => setValue(1)}>Overview</button>
						}

						{value === 0 ?
							<button className={styles.clickedButton} onClick={() => setValue(0)}>Job Details</button>
							:
							<button onClick={() => setValue(0)}>Job Details</button>
						}

					</div>

					{value === 1 ?
						<div className={styles.overview}>
							<h1>About</h1>
							<p>{item.companyAbout}</p>
							<h1>Location</h1>
							<p>{item.companyLocation.address}</p>
							<p>{item.companyLocation.city}, {item.companyLocation.province}</p>
							<p>{item.companyLocation.postalCode}</p>
							<h1>Contact</h1>
							<p>{item.companyContact}</p>
							<h1>Link</h1>
							<p><a target="_blank" href={item.companyLink} rel="noopener noreferrer">{item.companyLink}</a></p>
						</div>
						:
						<div className={styles.jobDetails}>
							<h1>Job Name</h1>
							<p>{item.jobTitle}</p>
							<h1>Job Type</h1>
							<p>{item.jobType}</p>
							<h1>Job Employment</h1>
							<p>{item.employment}</p>
							<h1>Job Tags</h1>
							<p>{item.tags}</p>
							<h1>Job Description</h1>
							<p>{item.jobDescription}</p>
						</div>
					}
				</div>
			</div>
			<div className={styles.subheader2}>
				<button onClick={() => onSubmit(item, false)}
					className={styles.submit}>Submit</button>
			</div>
		</div>
	);
};

export default function FormPages() {
	const [formPage, setFormPage] = useState<number>(1);

	const [item, setItem] = useState<CompanyJob>({

		companyImage: null,
		companyName: "",
		companyContact: "",
		companyLink: "",
		companyLocation: {
			address: "",
			city: "",
			province: "BC",
			postalCode: ""
		},
		companyAbout: "",
		jobTitle: "",
		jobType: JobPosting.JobTitleType.PartTime,
		employment: JobPosting.EmploymentType.Hybrid,
		jobDescription: "",
		tags: ""
	});

	function isCompanyValid() {
		return (
			item.companyAbout !== "" &&
            item.companyContact !== "" &&
			item.companyLink !== "" &&
            item.companyLocation.address !== "" &&
            item.companyLocation.city !== "" &&
            item.companyLocation.postalCode !== "" &&
            item.companyLocation.province !== "" &&
            item.companyName !== ""
		);
	}

	function isJobValid() {
		return (
			item.jobDescription != "" &&
            item.jobTitle !== "" &&
            item.jobType !== "" &&
            item.tags !== ""
		);
	}

	const handleBack = () => {
		setFormPage(formPage - 1);
	};

	async function handleSubmit(datatest: CompanyJob, changePage: boolean = false) {
		setItem({ ...datatest });
		const tags = item.tags.split(",");
		if (formPage === 3) {

			const form = new FormData();
			form.append("files", item.companyImage!);

			const img = {
				method: "POST",
				url: "cloudinary",
				data: form
			};

			const { data } = await instance.request(img);
			const { data: { data:{ url:url } } } = await instance.post("/cloudinary", form);

			const jobPosting = {

				companyImage: url.public_id,
				companyName: item.companyName,
				companyAbout: item.companyAbout,
				companyLink: item.companyLink,
				companyLocation: [
					{
						location: {
							address: item.companyLocation.address,
							city: item.companyLocation.city,
							province: item.companyLocation.province,
							postalCode: item.companyLocation.postalCode
						}
					}
				],
				companyContact: item.companyContact,
				jobTitle: item.jobTitle,
				jobType: item.jobType,
				employment: item.employment,
				jobDescription: item.jobDescription,
				tags: tags
			};

			const obj = {
				jobPosting
			};

			await instance.post("/jobPosting/create", obj);
			router.push("/");

		} else if(changePage) {
			setFormPage(formPage + 1);
		}
	}

	return (
		<div>
			<div className={styles.stepper}>

				<p className={formPage >= 1 ? isCompanyValid()
					? styles.selected : styles.error : styles.unselected}
				onClick={() => {setFormPage(1);} }>Step 1: Company Information</p>

				<p className={formPage >= 2 ? isJobValid() ?
					styles.selected : styles.error : styles.unselected}
				onClick={() => {setFormPage(2);} } >Step 2: Job Information</p>

				<p className={formPage >= 3 ? isCompanyValid() && isJobValid() ?
					styles.selected : styles.error : styles.unselected}
				onClick={() => {setFormPage(3);} } >Step 3: Confirmation</p>

			</div>

			{ formPage === 1 && <CompanyPostInfo onSubmit={handleSubmit} item={item}/>
            ||formPage === 2 && <JobPostInfo onSubmit={handleSubmit} item={item}/>
            ||formPage === 3 && <PostCoop onSubmit={handleSubmit} item={item} />
			}
			{formPage > 1 && (
				<div className={styles.back}>
					<Button
						onClick={handleBack}
						type={"button"}
						className={styles.backbutton}>
                        Back
					</Button>
				</div>
			)}
		</div>
	);
};

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
					destination: "/",
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

