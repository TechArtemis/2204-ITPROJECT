import { getToken } from "next-auth/jwt";


export default function savedJobs(){
    return (
        <div>savedJobs</div>
    );
};


export async function getServerSideProps(context: { [key: string]: any }) {
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

    return {
        props: {}
    };
}