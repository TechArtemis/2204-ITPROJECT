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

    // companyImage: File | null;
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
function CompanyPostInfo({ onSubmit, data }: any) {
    const inputRef = useRef<HTMLInputElement>(null);
    const options: Province[] = Object.keys(Location.Province).map(key => {
        return {
            value: key,
            label: Location.Province[key as keyof typeof Location.Province]
        };
    }) as Province[];


    function handleChange(event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) {
        onSubmit({ ...data, [event.target.name]: event.target.value });
        console.log(event.target.name);
    }

    function handleCompanyLocation(event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>) {
        onSubmit({ ...data, companyLocation: { ...data.companyLocation, [event.target.name]: event.target.value } });
    }

    function handleRouteToJobs() {
        router.push("/displayJobs");
    }

    return (
        <form className={styles.container}>
            <div className={styles.form}>
                <div className={styles.field}>
                    <Input
                        type="text"
                        placeholder="Company Name"
                        name="companyName" value={data.companyName}
                        onChangeInput={handleChange}>
                        <BusinessIcon sx={{ color: "#84BD00" }}/>
                    </Input>
                    <Input
                        type="text"
                        placeholder="Contact"
                        name="companyContact" value={data.companyContact}
                        onChangeInput={handleChange} >
                        <EmailIcon sx={{ color: "#84BD00" }}/>
                    </Input>
                    <Input
                        type="text"
                        placeholder="Address"
                        name="address" value={data.companyLocation.address}
                        onChangeInput={handleCompanyLocation}>
                        <LocationOnIcon sx={{ color: "#84BD00" }}/>
                    </Input>
                    <Input
                        type="text"
                        placeholder="Enter your city"
                        name="city" value={data.companyLocation.city}
                        onChangeInput={handleCompanyLocation}>
                        <LocationCityIcon sx={{ color: "#84BD00" }}/>
                    </Input>
                    <Input
                        type="text"
                        placeholder="Postal Code"
                        name="postalCode" value={data.companyLocation.postalCode}
                        onChangeInput={handleCompanyLocation}>
                        <MarkunreadMailboxIcon sx={{ color: "#84BD00" }}/>
                    </Input>
                    <SelectOption
                        name="province"
                        value={data.companyLocation.province}
                        onChange={handleCompanyLocation}
                        options={options}>
                        <LandscapeIcon sx={{ color: "#84BD00" }}/>
                    </SelectOption>
                    <Input
                        type="textarea"
                        placeholder="Enter your Desctiption"
                        name="companyAbout" value={data.companyAbout}
                        rows={6}
                        onChangeTextArea={handleChange}>
                        <DescriptionIcon sx={{ color: "#84BD00" }}/>
                    </Input>
                </div>
                <Button
                    type="submit"
                    onClick={() => onSubmit(data, true)}
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
        </form>
    );
};

function JobPostInfo({ onSubmit, data }: any) {
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
        onSubmit({ ...data, [event.target.name]: event.target.value });
        console.log(data);
    }

    return (
        <form className={styles.container}>
            <div className={styles.form}>
                <div className={styles.field}>
                    <Input
                        type="text"
                        label="Job Title"
                        placeholder="Job Title"
                        name="jobTitle" value={data.jobTitle}
                        onChangeInput={handleChange}>
                        <BusinessIcon sx={{ color: "#84BD00" }} />
                    </Input>
                    <SelectOption
                        name="jobType"
                        value={data.jobType}
                        onChange={handleChange}
                        options={jobTypeOptions}
                    >
                        <PersonSearchIcon sx={{ color: "#84BD00" }} />
                    </SelectOption>
                    <SelectOption
                        name="employment"
                        value={data.employment}
                        onChange={handleChange}
                        options={employmentOptions}
                    >
                        <WorkIcon sx={{ color: "#84BD00" }} />
                    </SelectOption>
                    <Input
                        type="textarea"
                        placeholder="Enter your Description"
                        name="jobDescription" value={data.jobDescription}
                        rows={8}
                        onChangeTextArea={handleChange}
                    >
                        <DescriptionIcon sx={{ color: "#84BD00" }} />
                    </Input>
                </div>
                <Button
                    type="submit"
                    onClick={() => onSubmit(data, true)}
                    className={styles.submit}>
                    Next
                </Button>
            </div>
        </form>
    );
};

function PostCoop({ onSubmit, data }: any) {
    const [value, setValue] = useState(1);

    return (
        <div>
            <div className={styles.submitform}>
                <div className={styles.header}>
                    <Image className={styles.logo} src={"/images/companyDefaultIcon.png"} alt={"image"} width={85} height={85} />
                    <div className={styles.subheader}>
                        <div>
                            <h1>{data.companyName}</h1>
                            <p>Status</p>
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
                            <p>{data.companyAbout}</p>
                            <h1>Location</h1>
                            <p>{data.companyLocation.address}</p>
                            <p>{data.companyLocation.city}, {data.companyLocation.province}</p>
                            <p>{data.companyLocation.postalCode}</p>
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
            <div className={styles.subheader2}>
                <button onClick={() => onSubmit(data, false)}
                    className={styles.submit}>Submit</button>
            </div>
        </div>
    );
};

export default function FormPages() {
    const [formPage, setFormPage] = useState<number>(1);

    const [data, setData] = useState<CompanyJob>({

        // companyImage: null,
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
            data.companyAbout !== "" &&
            data.companyContact !== "" &&
            data.companyLocation.address !== "" &&
            data.companyLocation.city !== "" &&
            data.companyLocation.postalCode !== "" &&
            data.companyLocation.province !== "" &&
            data.companyName !== ""
        );
    }

    function isJobValid() {
        return (
            data.jobDescription != "" &&
            data.jobTitle !== "" &&
            data.jobType !== ""
        );
    }

    const handleBack = () => {
        setFormPage(formPage - 1);
    };

    async function handleSubmit(datatest: CompanyJob, changePage: boolean = false) {
        setData({ ...data, ...datatest });
        if (formPage === 3) {

            const jobPosting = {

                // companyImage: data.companyImage,
                companyName: data.companyName,
                companyAbout: data.companyAbout,
                companyLocation: [
                    {
                        location: {
                            address: data.companyLocation.address,
                            city: data.companyLocation.city,
                            province: data.companyLocation.province,
                            postalCode: data.companyLocation.postalCode
                        }
                    }
                ],
                companyContact: data.companyContact,
                jobTitle: data.jobTitle,
                jobType: data.jobType,
                employment: data.employment,
                jobDescription: data.jobDescription,

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


            { formPage === 1 && <CompanyPostInfo onSubmit={handleSubmit} data={data}/>
            ||formPage === 2 && <JobPostInfo onSubmit={handleSubmit} data={data}/>
            ||formPage === 3 && <PostCoop onSubmit={handleSubmit} data={data} />
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




