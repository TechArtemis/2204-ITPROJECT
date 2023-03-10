//third-party imports
import { useState } from "react";
import Image from "next/image";
import { getToken } from "next-auth/jwt";
import dynamic from "next/dynamic";

//local imports
import Navbar from "@/components/navbar";
import styles from "@/styles/form.module.sass";
import { getJobPosting } from "@/backend/actions/jobPosting";


//dynamic imports
const EditIcon = dynamic(() => import("@mui/icons-material/Edit"));
const DeleteIcon = dynamic(() => import("@mui/icons-material/Delete"));
const CheckIcon = dynamic(() => import("@mui/icons-material/Check"));


export default function PostCoop({ data }: any) {
    const [value, setValue] = useState(1);
    const [button, setButton] = useState(1);

    return (
        <div>
            <Navbar />
            <div className={styles.submitform}>
                <div className={styles.header}>
                    <Image className={styles.logo} src={`https://res.cloudinary.com/honeydrew/${data.companyImage}`} alt={"image"} width={150} height={150} />
                    <div className={styles.subheader}>
                        <div>
                            <h1>{data.companyName}</h1>
                            <p>{data.companyLocation[0].location.city}</p>
                        </div>
                        <div>
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
                                        <CheckIcon fontSize={"large"} type="submit" sx={{ color: "#84BD00" }} />
                                    </button>
                                </div>
                            }
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
        const form = await getJobPosting(id);

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