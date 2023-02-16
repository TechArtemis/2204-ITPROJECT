
import React, { ChangeEvent, useState } from "react";
import styles from "@/styles/form.module.sass";
import Button from "@/components/button";
import Input from "@/components/input";
import Image from "next/image";
import dynamic from "next/dynamic";
import { instance } from "@/shared/axiosInstance";
import router from "next/router";
import { Location } from "@/interface/Location";
// import ImageUpload from "@/components/imageUpload";

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
    // companyLogo: string;
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

export function CompanyPostInfo({ onSubmit } : any ) {
    const [data, setData] = useState ({
        companyName: "",
        companyContact: "",
        companyLocation: {
            address: "",
            city: "",
            province: "",
            postalCode: "",
        },
        companyAbout: ""
    });

    function handleChange(event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) {
        setData({ ...data, [event.target.name]: event.target.value });
    }

    function handleCompanyLocation(event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) {
        setData({ ...data, companyLocation: { ...data.companyLocation, [event.target.name]: event.target.value } });
    }

    return ( <form className={styles.container}>
        <div className={styles.logo}>
            <Image src={"/images/vccLogo.png"} alt={"logo"} width={100} height={100}></Image>
        </div>
        <div className={styles.form}>
            <div className={styles.field}>
                {/* <ImageUpload image={data.image} onChange={handleChange} /> */}
                <Input
                    type="text"
                    placeholder="Company Name"
                    name="companyName" value={data.companyName}
                    onChangeInput={handleChange}>
                    <BusinessIcon fontSize={"medium"} sx={{ color: "#84BD00" }}/>
                </Input>
                <Input
                    type="text"
                    placeholder="Contact"
                    name="companyContact" value={data.companyContact}
                    onChangeInput={handleChange} >
                    <AlternateEmailIcon fontSize={"medium"} sx={{ color: "#84BD00" }}/>
                </Input>
                <Input
                    type="text"
                    placeholder="Address"
                    name="address" value={data.companyLocation.address}
                    onChangeInput={handleCompanyLocation}>
                    <LocationOnIcon fontSize={"medium"} sx={{ color: "#84BD00" }}/>
                </Input>
                <Input
                    type="text"
                    placeholder="Enter your city"
                    name="city" value={data.companyLocation.city}
                    onChangeInput={handleCompanyLocation}>
                    <LocationCityIcon fontSize={"medium"} sx={{ color: "#84BD00" }}/>
                </Input>
                <Input
                    type="text"
                    placeholder="Province"
                    name="province" value={data.companyLocation.province}
                    onChangeInput={handleCompanyLocation}>
                    <LandscapeIcon fontSize={"medium"} sx={{ color: "#84BD00" }}/>
                </Input>
                <Input
                    type="text"
                    placeholder="Postal Code"
                    name="postalCode" value={data.companyLocation.postalCode}
                    onChangeInput={handleCompanyLocation}>
                    <MarkunreadMailboxIcon fontSize={"medium"} sx={{ color: "#84BD00" }}/>
                </Input>
                <Input
                    type="textarea"
                    placeholder="Enter your Desctiption"
                    name="companyAbout" value={data.companyAbout}
                    rows={4}
                    onChangeTextArea={handleChange}
                >
                    <DescriptionIcon fontSize={"medium"} sx={{ color: "#84BD00" }}/>
                </Input>

            </div>
            <Button
                type="submit"
                onClick={() => onSubmit(data)}>
                Next
            </Button>
        </div>
    </form>
    );
};



export function JobPostInfo({ onSubmit, item }: any) {
    const [data, setData] = useState({
        jobTitle: "",
        jobType: "",
        employment: "",
        jobDescription: "",

    });
    function handleChange(event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) {
        setData({ ...data, [event.target.name]: event.target.value });
    }

    return (
        <form className={styles.container}>
            <div className={styles.logo}>
                <Image src={"/images/vccLogo.png"} alt={"logo"} width={100} height={100}></Image>
            </div>
            <div className={styles.form}>
                <div className={styles.field}>
                    <Input
                        type="text"
                        label="Job Title"
                        placeholder="Job Title"
                        name="jobTitle" value={data.jobTitle}
                        onChangeInput={handleChange}>
                        <BusinessIcon fontSize={"medium"} sx={{ color: "#84BD00" }}/>
                    </Input>
                    {/* add a map function to this category */}
                    <Input
                        type="text"
                        label="Job Type"
                        placeholder="Job Type"
                        name="jobType" value={data.jobType}
                        onChangeInput={handleChange}>
                        <PersonSearchIcon fontSize={"medium"} sx={{ color: "#84BD00" }}/>
                    </Input>
                    <Input
                        type="text"
                        label="Job Employment"
                        placeholder="Job Employment"
                        name="employment" value={data.employment}
                        onChangeInput={handleChange} >
                        <WorkIcon fontSize={"medium"} sx={{ color: "#84BD00" }}/>
                    </Input>
                    <Input
                        type="textarea"
                        placeholder="Enter your Desctiption"
                        name="jobDescription" value={data.jobDescription}
                        rows={4}
                        onChangeTextArea={handleChange}
                    >
                        <DescriptionIcon fontSize={"medium"} sx={{ color: "#84BD00" }}/>
                    </Input>
                </div>
                <Button
                    type="submit"
                    onClick={() => onSubmit(data)}>
                Next
                </Button>
            </div>
        </form>
    );
}

export function PostCoop({ onSubmit, data }: any) {
    const [value, setValue] = useState(1);
    const [button, setButton] = useState(1);

    return(
        <div>
            <div className={styles.header}>
                <Image src={"/images/defaultProfile.png"} alt={"image"} width={150} height={150}></Image>
                <div className={styles.subheader}>
                    <div>
                        <h1>{data.companyName}</h1>
                        <p>status</p>
                    </div>

                    {button === 1 ?
                        <div>
                            <button onClick={() => setButton(0)}>
                                <EditIcon fontSize={"large"} sx={{ color: "#000000" }}/>
                            </button>

                        </div>
                        :
                        <div>
                            <button onClick={() => setButton(1)}>
                                <DeleteIcon fontSize={"large"} sx={{ color: "#DA0000" }}/>
                            </button>
                            <button onClick={() => setButton(1)}>
                                <CheckIcon type="submit"
                                    onClick={() => onSubmit(data)}/>
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
    );


}




export default function FormPages() {
    const [formPage, setFormPage] = useState<number>(1);
    const [data, setData] = useState<CompanyJob>();

    async function handleSubmit(datatest : CompanyJob) {
        setData({ ...data, ...datatest });

        if (formPage === 3){

            const jobPosting = {
                companyName: data?.companyName,
                companyAbout: data?.companyAbout,
                companyLocation: [
                    {
                        location:{
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

            console.log(jobPosting);

            await instance.post("/jobPosting/create", obj);
            router.push("/");
            console.log("test", data);

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


