//third-party imports
import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import router from "next/router";
import axios from "axios"

//local imports
import styles from "@/styles/form.module.sass";
import Button from "@/components/button";
import Input from "@/components/input";
import { Location } from "@/interface/Location";
import SelectOption from "@/components/dropdown";
import { JobPosting } from "@/interface/JobPosting";
import { instance } from "@/shared/axiosInstance";
import Navbar from "@/components/navbar";


//dynamic imports
const BusinessIcon = dynamic(() => import("@mui/icons-material/BusinessRounded"));
const EmailIcon = dynamic(() => import("@mui/icons-material/EmailOutlined"));
const LocationOnIcon = dynamic(() => import("@mui/icons-material/LocationOnOutlined"));
const LocationCityIcon = dynamic(() => import("@mui/icons-material/LocationCity"));
const LandscapeIcon = dynamic(() => import("@mui/icons-material/LandscapeOutlined"));
const MarkunreadMailboxIcon = dynamic(() => import("@mui/icons-material/MarkunreadMailboxOutlined"));
const DescriptionIcon = dynamic(() => import("@mui/icons-material/DescriptionOutlined"));
const PersonSearchIcon = dynamic(() => import("@mui/icons-material/PersonSearch"));
const WorkIcon = dynamic(() => import("@mui/icons-material/Work"));

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
 *
 */

//interface for the form
interface CompanyJob {

    companyImage: File | null;
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
        // const form = new FormData();
        // form.append("files", val!);

        // const setting = {
        //     method: "POST",
        //     url: "cloudinary",
        //     data: form
        // };

        // console.log(setting);

        // const { data } = await instance.request(setting);

        // const { data: {data:{url:url} } } = await instance.post("/cloudinary", form)

        onSubmit({ ...item, companyImage: val });

        // const form = new FormData();
        // form.append("files", val!);
        // const setting = {
        //     method: "POST",
        //     url: "cloudinary",
        //     data: form
        // };
        // try {
        //     const { data } = await instance.request(setting);
        //     console.log(data)
        //     onSubmit({ ...item, companyImage: data.data.url.public_id });
        // } catch (error: any) {
        //     console.log("NETWORK ERROR", error);
        // }
    };

    function handleFileClick() {
        inputRef.current?.click();
    }

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <div className={styles.field}>
                    <div onClick={handleFileClick}>
                        <input type="file" name="companyImage" ref={inputRef} onChange={handleImgUpload} accept="image" style={{ display: "none" }}/>
                        {
                            item.companyImage ? <Image src={URL.createObjectURL(item.companyImage)} width={100} height={100} alt="Image"/> :
                                <button>
                                    <Image src={"/images/vcc.png"} width={100} height={75} alt="Logo"/>
                                </button>
                        }
                    </div>
                    {/* <Input
                        type="file"
                        placeholder="Upload an Image"
                        onChangeInput={handleImgUpload}>
                        <BusinessIcon fontSize={"medium"} sx={{ color: "#84BD00" }} />
                    </Input> */}
                    <Input
                        type="text"
                        placeholder="Company Name"
                        name="companyName" value={item.companyName}
                        onChangeInput={handleChange}>
                        <BusinessIcon sx={{ color: "#84BD00" }}/>
                    </Input>
                    <Input
                        type="text"
                        placeholder="Contact"
                        name="companyContact" value={item.companyContact}
                        onChangeInput={handleChange} >
                        <EmailIcon sx={{ color: "#84BD00" }}/>
                    </Input>
                    <Input
                        type="text"
                        placeholder="Address"
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
                        placeholder="Postal Code"
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
                        placeholder="Enter your Desctiption"
                        name="companyAbout" value={item.companyAbout}
                        rows={4}
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
        console.log(item);
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
                        type="textarea"
                        placeholder="Enter your Desctiption"
                        name="jobDescription" value={item.jobDescription}
                        rows={4}
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
                    <Image className={styles.logo} src={URL.createObjectURL(item.companyImage) } alt={"image"} width={85} height={85} />
                    <div className={styles.subheader}>
                        <div>
                            <h1>{item.companyName}</h1>
                            <p>status</p>
                        </div>
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
                            <p>{item.companyAbout}</p>
                            <h1>Location</h1>
                            <p>{item.companyLocation.address}{item.companyLocation.city}{item.companyLocation.province}{item.companyLocation.postalCode}</p>
                            <h1>Contact</h1>
                            <p>{item.companyContact}</p>
                        </div>
                        :
                        <div className={styles.jobDetails}>
                            <h1>Job Name</h1>
                            <p>{item.jobTitle}</p>
                            <h1>Job Type</h1>
                            <p>{item.jobType}</p>
                            <h1>Job Employment</h1>
                            <p>{item.employment}</p>
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
        companyLocation: {
            address: "",
            city: "",
            province: "AB",
            postalCode: ""
        },
        companyAbout: "",
        jobTitle: "",
        jobType: JobPosting.JobTitleType.PartTime,
        employment: JobPosting.EmploymentType.Hybrid,
        jobDescription: ""
    });

    function isCompanyValid() {
        return (
            item.companyAbout !== "" &&
            item.companyContact !== "" &&
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
            item.jobType !== ""
        );
    }

    const handleBack = () => {
        setFormPage(formPage - 1);
    };

    async function handleSubmit(datatest: CompanyJob, changePage: boolean = false) {
        setItem({ ...datatest });
        if (formPage === 3) {

            const form = new FormData();
            form.append("files", item.companyImage!);

            const img = {
                method: "POST",
                url: "cloudinary",
                data: form
            };

            const { data } = await instance.request(img);
            const { data: {data:{url:url} } } = await instance.post("/cloudinary", form)

            console.log(url.public_id)

            const jobPosting = {

                companyImage: url.public_id,
                companyName: item.companyName,
                companyAbout: item.companyAbout,
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

            };

            const obj = {
                jobPosting
            };

            console.log("test",obj);

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




