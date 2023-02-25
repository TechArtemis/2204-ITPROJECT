
import React, { ChangeEvent, useState } from "react";
import styles from "@/styles/form.module.sass";
import Button from "@/components/button";
import Input from "@/components/input";
import Image from "next/image";
import dynamic from "next/dynamic";
import { instance } from "@/shared/axiosInstance";
import router from "next/router";
import { Location } from "@/interface/Location";
import SelectOption from "@/components/dropdown";
import { JobPosting } from "@/interface/JobPosting";
import Navbar from "@/components/navbar";


const CameraAlt = dynamic(() => import("@mui/icons-material/CameraAlt"));
const BusinessIcon = dynamic(() => import("@mui/icons-material/Business"));
const AlternateEmailIcon = dynamic(() => import("@mui/icons-material/AlternateEmail"));
const LocationOnIcon = dynamic(() => import("@mui/icons-material/LocationOn"));
const LocationCityIcon = dynamic(() => import("@mui/icons-material/LocationCity"));
const LandscapeIcon = dynamic(() => import("@mui/icons-material/Landscape"));
const MarkunreadMailboxIcon = dynamic(() => import("@mui/icons-material/MarkunreadMailbox"));
const DescriptionIcon = dynamic(() => import("@mui/icons-material/Description"));
const PersonSearchIcon = dynamic(() => import("@mui/icons-material/PersonSearch"));
const WorkIcon = dynamic(() => import("@mui/icons-material/Work"));

const DeleteIcon = dynamic(() => import("@mui/icons-material/Delete"));
const EditIcon = dynamic(() => import("@mui/icons-material/Edit"));
const CheckIcon = dynamic(() => import("@mui/icons-material/Check"));

interface CompanyJob {
    companyImage: string;
    companyName: string;
    companyContact: string;
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
}

interface Province {
    value: keyof typeof Location.Province;
    label: string;
}

interface JobType {
    value: keyof typeof JobPosting.JobTitleType;
    label: string;
}

interface Employment {
    value: keyof typeof JobPosting.JobTitleType;
    label: string;
}

export function CompanyPostInfo({ onSubmit }: any) {

    const options: Province[] = Object.keys(Location.Province).map(key => {
        return {
            value: key,
            label: Location.Province[key as keyof typeof Location.Province]
        };
    }) as Province[];

    const [item, setItem] = useState({
        companyImage: "",
        companyName: "",
        companyContact: "",
        companyLocation: {
            address: "",
            city: "",
            province: "AB",
            postalCode: "",
        },
        companyAbout: ""
    });

    function handleChange(event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) {
        setItem({ ...item, [event.target.name]: event.target.value });
    }

    function handleCompanyLocation(event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>) {
        setItem({ ...item, companyLocation: { ...item.companyLocation, [event.target.name]: event.target.value } });
    }

    async function handleImgUpload (event: ChangeEvent<HTMLInputElement>){
        const val = event.target.files![0];
        const form = new FormData();
        form.append("files", val!);
        const setting = {
            method: "POST",
            url: "cloudinary",
            data: form
        };
        try {
            const { data } = await instance.request(setting);
            setItem({ ...item, companyImage: data.data.url.public_id });
        } catch (error: any) {
            console.log("NETWORK ERROR", error);
        }
    };

    return (
        <form className={styles.container}>
            <Navbar/>
            <div className={styles.form}>
                <Input
                    type="file"
                    value={""}
                    placeholder="Upload an Image"
                    onChangeInput={handleImgUpload}/>
                <Image src={`https://res.cloudinary.com/honeydrew/${item.companyImage}`} width={100} height={100} alt={"Company Logo"} />
                <div className={styles.field}>
                    {/* <ImageUpload image={data.image} onChange={handleChange} /> */}
                    <Input
                        type="text"
                        placeholder="Company Name"
                        name="companyName" value={item.companyName}
                        onChangeInput={handleChange}>
                        <BusinessIcon fontSize={"medium"} sx={{ color: "#84BD00" }} />
                    </Input>
                    <Input
                        type="text"
                        placeholder="Address"
                        name="address" value={item.companyLocation.address}
                        onChangeInput={handleCompanyLocation}>
                        <LocationOnIcon fontSize={"medium"} sx={{ color: "#84BD00" }} />
                    </Input>
                    <Input
                        type="text"
                        placeholder="Contact"
                        name="companyContact" value={item.companyContact}
                        onChangeInput={handleChange} >
                        <AlternateEmailIcon fontSize={"medium"} sx={{ color: "#84BD00" }} />
                    </Input>
                    <Input
                        type="text"
                        placeholder="Enter your city"
                        name="city" value={item.companyLocation.city}
                        onChangeInput={handleCompanyLocation}>
                        <LocationCityIcon fontSize={"medium"} sx={{ color: "#84BD00" }} />
                    </Input>
                    <Input
                        type="text"
                        placeholder="Postal Code"
                        name="postalCode" value={item.companyLocation.postalCode}
                        onChangeInput={handleCompanyLocation}>
                        <MarkunreadMailboxIcon fontSize={"medium"} sx={{ color: "#84BD00" }} />
                    </Input>
                    <SelectOption
                        name="province"
                        value={item.companyLocation.province}
                        onChange={handleCompanyLocation}
                        options={options}
                    >
                        <LandscapeIcon fontSize={"medium"} sx={{ color: "#84BD00" }} />
                    </SelectOption>
                    <Input
                        type="textarea"
                        placeholder="Enter your Desctiption"
                        name="companyAbout" value={item.companyAbout}
                        rows={4}
                        onChangeTextArea={handleChange}
                    >
                        <DescriptionIcon fontSize={"medium"} sx={{ color: "#84BD00" }} />
                    </Input>

                </div>
                <Button
                    type="submit"
                    onClick={() => onSubmit(item)}
                    className={styles.submit}>
                Next
                </Button>
            </div>
        </form>
    );
};

export function JobPostInfo({ onSubmit, item }: any) {

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

    const [data, setData] = useState({
        jobTitle: "",
        jobType: "PartTime",
        employment: "Remote",
        jobDescription: "",

    });
    function handleChange(event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>) {
        setData({ ...data, [event.target.name]: event.target.value });
    }

    return (
        <form className={styles.container}>
            <Navbar/>
            <div className={styles.form}>
                <div className={styles.field}>
                    <Input
                        type="text"
                        label="Job Title"
                        placeholder="Job Title"
                        name="jobTitle" value={data.jobTitle}
                        onChangeInput={handleChange}>
                        <BusinessIcon fontSize={"medium"} sx={{ color: "#84BD00" }} />
                    </Input>
                    <SelectOption
                        name="jobType"
                        value={data.jobType}
                        onChange={handleChange}
                        options={jobTypeOptions}
                    >
                        <PersonSearchIcon fontSize={"medium"} sx={{ color: "#84BD00" }} />
                    </SelectOption>
                    <SelectOption
                        name="employment"
                        value={data.employment}
                        onChange={handleChange}
                        options={employmentOptions}
                    >
                        <WorkIcon fontSize={"medium"} sx={{ color: "#84BD00" }} />
                    </SelectOption>
                    <Input
                        type="textarea"
                        placeholder="Enter your Desctiption"
                        name="jobDescription" value={data.jobDescription}
                        rows={4}
                        onChangeTextArea={handleChange}
                    >
                        <DescriptionIcon fontSize={"medium"} sx={{ color: "#84BD00" }} />
                    </Input>
                </div>
                <Button
                    type="submit"
                    onClick={() => onSubmit(data)}
                    className={styles.submit}>
                    Next
                </Button>
            </div>
        </form>
    );
}

export function PostCoop({ onSubmit, data }: any) {
    const [value, setValue] = useState(1);
    const [button, setButton] = useState(1);

    return (
        <div>
            <Navbar/>
            <div className={styles.submitform}>
                <div className={styles.header}>
                    <Image className={styles.logo} src={`https://res.cloudinary.com/honeydrew/${data.companyImage}` } alt={"image"} width={150} height={150}></Image>
                    <div className={styles.subheader}>
                        <div>
                            <h1>{data.companyName}</h1>
                            <p>status</p>
                        </div>

                        {button === 1 ?
                            <div>
                                <button onClick={() => setButton(0)}>
                                    <EditIcon fontSize={"large"} sx={{ color: "#000000" }} />
                                </button>

                            </div>
                            :
                            <div className={styles.options}>
                                <button onClick={() => setButton(1)}>
                                    <DeleteIcon fontSize={"large"} sx={{ color: "#DA0000" }} />
                                </button>
                                <button onClick={() => setButton(1)}>
                                    <CheckIcon fontSize={"large"} type="submit" sx={{ color: "#84BD00" }}
                                        onClick={() => onSubmit(data)} />
                                </button>
                            </div>
                        }
                    </div>
                </div>
                <div className={styles.content}>

                    <div className={styles.subcontent}>
                        <button onClick={() => setValue(1)}>Overview</button>
                        <button onClick={() => setValue(0)}>Job Details</button>
                    </div>

                    {value === 1 ?
                        <div className={styles.overview}>
                            <h1>About</h1>
                            <p>{data.companyAbout}</p>
                            <h1>Location</h1>
                            <p>{data.companyLocation.address}{data.companyLocation.city}{data.companyLocation.province}{data.companyLocation.postalCode}</p>
                            <h1>Contact</h1>
                            <p>{data.companyContact}</p>
                        </div>
                        :
                        <div className={styles.jobDetails}>
                            <h1>Job Name</h1>
                            <p>{data.jobTitle}</p>
                            <h1>Job Type</h1>
                            <p>{data.jobType}</p>
                            <h1>Job Employment</h1>
                            <p>{data.employment}</p>
                            <h1>Job Description</h1>
                            <p>{data.jobDescription}</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default function FormPages() {
    const [formPage, setFormPage] = useState<number>(1);
    const [data, setData] = useState<CompanyJob>();

    async function handleSubmit(datatest: CompanyJob) {
        setData({ ...data, ...datatest });

        if (formPage === 3) {

            const jobPosting = {
                companyImage: data?.companyImage,
                companyName: data?.companyName,
                companyAbout: data?.companyAbout,
                companyLocation: [
                    {
                        location: {
                            address: data?.companyLocation.address,
                            city: data?.companyLocation.city,
                            province: data?.companyLocation.province,
                            postalCode: data?.companyLocation.postalCode
                        }
                    }
                ],
                companyContact: data?.companyContact,
                jobTitle: data?.jobTitle,
                jobType: data?.jobType,
                employment: data?.employment,
                jobDescription: data?.jobDescription,

            };

            const obj = {
                jobPosting
            };

            console.log(obj);

            await instance.post("/jobPosting/create", obj);
            router.push("/");

        } else {
            setFormPage(formPage + 1);
        }
    }

    return (
        <div>
            {
                formPage === 1 && <CompanyPostInfo onSubmit={handleSubmit} /> || formPage === 2 && <JobPostInfo onSubmit={handleSubmit} /> || formPage === 3 && <PostCoop onSubmit={handleSubmit} data={data} />
            }
        </div>
    );
}

