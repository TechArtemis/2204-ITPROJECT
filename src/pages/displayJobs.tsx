import { getAllPosting } from "@/backend/actions/jobPosting";
import Card from "@/components/cards";
import { JobPosting } from "@/interface/JobPosting";
import { getToken } from "next-auth/jwt";
import styles from "@/styles/displayJobs.module.sass";
import Navbar from "@/components/navbar";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Button from "@/components/button";
import router from "next/router";
import { getFavorites } from "@/backend/actions/student";

const Search = dynamic(() => import("@mui/icons-material/Search"));
const AddIcon = dynamic(() => import("@mui/icons-material/Add"));

interface Props {
    data: JobPosting[]
}

interface Props2 {
    data2: JobPosting[]
}

// This is page is used to display all the jobs posted by the company
export default function DisplayJobs({ data }: Props, data2:Props2) {


    const [search, setSearch] = useState("");

    function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
        const val = event.target.value;

        setSearch(val);
    };

    function handleRouteToForm() {
        router.push("/form");

    }

    return (
        <div>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.search}>
                    <input
                        type="text"
                        placeholder="Search companies, job name, keywords,etc."
                        value={search}
                        onChange={handleSearch}>
                    </input>
                    <Search fontSize="medium" />
                </div>
                <Button
                    type={"button"}
                    onClick={() => handleRouteToForm()}
                    className={styles.post}>
                    <div>
                        <p>Post Job</p>
                        <AddIcon fontSize="medium" sx={{ color: "#ffff" }}/>
                    </div>
                </Button>
            </div>

            <div className={styles.title}>
                <h1>Explore Jobs</h1>
            </div>

            <div className={styles.cardContainer}>
                <div className={styles.cardArr} >

                    {(data.length === 0 && (
                        <div className={styles.nocontent}>No Jobs have created ⚠️</div>
                    ))}

                    {data.filter((card) => card.companyName.toLowerCase().includes(search.toLowerCase())
                        || card.jobTitle.toLowerCase().includes(search.toLowerCase())
                        || card.companyLocation[0].location.city.toLowerCase().includes(search.toLowerCase())
                        || card.jobType.toLowerCase().includes(search.toLowerCase()))
                        .map((post: JobPosting, idx) => (
                            <div key={idx} className={styles.cardWrapper}>
                                <Card
                                    image={post.companyImage}
                                    name={post.companyName}
                                    address={post.companyLocation[0].location.city}
                                    job={post.jobTitle}
                                    type={post.jobType} id={post._id as string}
                                />
                            </div>
                        ))}
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

        const form = await getAllPosting();
        const form2 = await getFavorites(token.email as string);

        const liked = form.message.filter((form:any) => {
            return form2.message.includes(form);
        });

        console.log("form",form);
        console.log("form2", form2);


        return {
            props: {
                data: JSON.parse(JSON.stringify(form.message))
                // data2: JSON.parse(JSON.stringify(liked))
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
