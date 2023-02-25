import { Box } from "@chakra-ui/react";
import Intro from "./landing/sections/intro";
import Services from "./landing/sections/services";
import HowWeWork from "./landing/sections/howWeWork";
import Testimonials from "./landing/sections/testimonials";
import Commitments from "./landing/sections/commitments";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { getToken } from "next-auth/jwt";


export default function Home() {
    return (
        <Box>
            <Header />
            <Intro/>
            <Services/>
            <Commitments/>
            <HowWeWork/>
            <Testimonials/>
            <Footer/>
        </Box>
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

    // If the user is already logged in, redirect.
    // Note: Make sure not to redirect to the same page
    // To avoid an infinite loop!
    if (token) {
        return { redirect: { destination: "/home", permanent: false } };
    }

    return {
        props: {}
    };
}
