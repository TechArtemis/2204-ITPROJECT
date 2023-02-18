import { getAllPosting } from "@/backend/actions/jobPosting";
import Card from "@/components/cards";
import { JobPosting } from "@/interface/JobPosting";
import { getToken } from "next-auth/jwt";
import styles from "@/styles/displayJobs.module.sass";
import Navbar from "@/components/navbar";

interface Props {
    data:JobPosting[]
}

// This is page is used to display all the jobs posted by the company
export default function DisplayJobs({ data } : Props) {
    console.log("Test", data);
    return (
        <div>
            <Navbar/>
            <div>
                <div className={styles.cardArr}>
                    {data.map((post: JobPosting, idx) => (
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
    try{
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
