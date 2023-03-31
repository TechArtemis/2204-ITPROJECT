// Third-party imports
import React from "react";
import { Box, Flex, Heading, HStack, Spacer, Text } from "@chakra-ui/react";
import { RiComputerLine } from "react-icons/ri";
import { BsPencilSquare } from "react-icons/bs";

// Local imports
import ServiceCard from "@/components/serviceCard";

export default function Services() {
	return (
		<Box w="full" py="60px" px={["50px", "100px", "200px", "200px"]}>
			<Flex justifyContent="space-between" alignItems="center" pb="60px" flexDirection={["column", "column", "column", "column", "row"]}>
				<Heading fontSize={42} fontFamily={"Lato-Bold"} letterSpacing="3px" color="green.900" textAlign={["center", "center", "center", "center", "left"]}>
                    Why join the <br /> co-operative education?
				</Heading>
				<Text maxW="300px" mt={["30px", "30px", "30px", "30px", "0px"]} color="green.900">Benefits of Co-operative Education include: Gain practical work experience in areas that complement your personal strengths, interests and educational needs. Discover new personal strengths and skills. Actively learn and thrive as a responsible team member in the “real world” in an area chosen by you.</Text>
			</Flex>

			<Flex w="full" gap={["20px", "20px", "20px", "20px", "60px"]} alignItems="center" flexDirection={["column", "column", "column", "column", "row"]}>
				<ServiceCard
					icon={RiComputerLine}
					heading="Job postings"
					description="This is your pathway to a great co op adventure and journey!"
				/>

				<Spacer/>

				<ServiceCard
					icon={BsPencilSquare}
					heading="Company Job Form"
					description="Companies looking for a co op or alumni student? Post your job here!"
				/>
			</Flex>
		</Box>
	);
};
