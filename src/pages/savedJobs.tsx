import { getFavorites } from "@/backend/actions/student";
import Card from "@/components/cards";
import Navbar from "@/components/navbar";
import { JobPosting } from "@/interface/JobPosting";
import styles from "@/styles/displayJobs.module.sass";
import { getToken } from "next-auth/jwt";


interface Props {
    data: JobPosting[]
}


export default function savedJobs({ data }: Props){
    return (
        <div>
            <Navbar/>
            <div>

                <div className={styles.title}>
                    <h1>Saved Jobs</h1>
                </div>

                <div className={styles.cardArr}>

                    {(data.length === 0 && (
                        <div className={styles.nocontent}>No Jobs have been saved ⚠️</div>
                    ))}

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
};

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
        console.log(token);
        if (!token) {
            return { redirect: { destination: "/login", permanent: false } };
        }

        const form = await getFavorites(token.email as string);

        console.log(token.email);
        console.log(form);

        if (form.message.length === 0) {
            return {
                props: {
                    data: []
                }
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