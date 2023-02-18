import { Box } from "@chakra-ui/react";
import { Intro } from "./landing/sections/intro";
import { Services } from "./landing/sections/services";
import { HowWeWork } from "./landing/sections/howWeWork";
import { Testimonials } from "./landing/sections/testimonials";
import { Commitments } from "./landing/sections/commitments";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";


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
