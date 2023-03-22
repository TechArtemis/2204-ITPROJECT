// Third-party imports
import React from "react";
import { Box, Flex, Heading, HStack, Text } from "@chakra-ui/react";
import { RiComputerLine } from "react-icons/ri";
import { BsPencilSquare } from "react-icons/bs";

// Local imports
import ServiceCard from "@/components/serviceCard";

export default function Services() {
    return (
        <Box w="full" py="60px" px="200px">
            <Flex justifyContent="space-between" alignItems="center" pb="60px">
                <Heading fontSize={42} fontFamily={"Lato-Bold"} letterSpacing="3px" color="green.900">
                    Why join the <br /> co operative education?
                </Heading>
                <Text maxW="300px" color="green.900">Benefits of Co-operative Education include: Gain practical work experience in areas that complement your personal strengths, interests and educational needs. Discover new personal strengths and skills. Actively learn and thrive as a responsible team member in the “real world” in an area chosen by you.</Text>
            </Flex>
            <HStack w="full" spacing="60px">
                <ServiceCard
                    icon={RiComputerLine}
                    heading="Job postings"
                    description="This is your pathway to a great co op adventure and journey!"
                />
                <ServiceCard
                    icon={BsPencilSquare}
                    heading="Company Job Form"
                    description="Companies looking for a co op or alumni student? Post your job here!"
                />
            </HStack>
        </Box>
    );
};
