import React from "react";
import { AspectRatio, Box, Flex, Heading, Icon, Img, VStack } from "@chakra-ui/react";
import { BiCheckDouble } from "react-icons/bi";
import { Commitment } from "@/components/commitments";
import studentBanner from "@/public/images/studentsBanner.png";

export const Commitments = () => {
    return (
        <Flex pl="200px" background="green.900" justifyContent="space-between" alignItems="center">
            <Box py="60px" pr="140px">
                <Heading fontSize={42} letterSpacing="4px" color="whiteAlpha.900" pb="60px">
                    Committed to your
                    <br /> success
                </Heading>
                <VStack alignItems="flex-start" color="whiteAlpha.800" spacing="30px">
                    <Commitment text="VCC will provide guidance on how to prepare a resume and cover letter, and how to apply for co-op positions." />
                    <Commitment text="VCC will also help students prepare for a successful co-op experience by offering co-op preparation resources." />
                    <Commitment text="VCC will provide academic support to help students balance their co-op and academic responsibilities. " />
                </VStack>
            </Box>
            <AspectRatio ratio={8 / 10} width="500px">
                <Img src="./images/studentsBanner.png"/>
            </AspectRatio>
        </Flex>
    );
};