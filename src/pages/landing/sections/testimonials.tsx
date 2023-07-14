import React from "react";
import { Box, Heading, Grid } from "@chakra-ui/react";
import TestimonialCard from "@/components/testimonialsCard";


export const Testimonials = () => {
	return (
		<Box px={["50px", "50px", "50px", "125px", "200px"]} py="60" bg="yellow.50">
			<Heading
				fontSize={42}
				letterSpacing="3px"
				color="green.900"
				pb="80px"
				fontFamily={"Lato-Bold"}>
                    The students have spoken
			</Heading>
			<Grid templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)" ]} gap="60px">
				<TestimonialCard />
				<TestimonialCard />
				<TestimonialCard />
				<TestimonialCard />
				<TestimonialCard />
				<TestimonialCard />
			</Grid>
		</Box>
	);
};

export default Testimonials;