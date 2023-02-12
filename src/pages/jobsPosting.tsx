import { JobPosting } from "@/interface/JobPosting";
import { instance } from "@/shared/axiosInstance";
import { getToken } from "next-auth/jwt";
import { useState } from "react";

interface Props {
    response: JobPosting[]
}

export default function JobPostings(props: Props) {
    const [data] = useState(props.response);
    return(
        <>
            <div>
                {
                    data.map((post: JobPosting, id: number) => (
                        <div key={id}>
                            <p>{post.companyName}</p>
                        </div>
                    ))
                }
            </div>
        </>
    );
}

export async function getServerSideProps(context: { [key: string]: any }) {
    const secret = process.env.NEXTAUTH_SECRET;
    const token = await getToken(
        {
            req: context.req,
            secret: secret
        }
    );
    console.log(token);

    // If the user is already logged in, redirect.
    // Note: Make sure not to redirect to the same page
    // To avoid an infinite loop!
    if (!token) {
        return { redirect: { destination: "/", permanent: false } };
    }

    const response = await instance.get("/api/jobPosting/getAll");

    return {
        props: {
            response
        }
    };
}