import React from "react";
import { Avatar, Box, Flex, Heading, Text } from "@chakra-ui/react";

export const TestimonialCard = () => {
    return (
        <Box w="full" px="40px" py="20px" p="40px" bg="white">
            <Flex alignItems="center" pb="30px">
                <Avatar src='https://bit.ly/dan-abramov' mr="20px"></Avatar>
                <Box>
                    <Heading fontSize={16} color="green.900" mb="2px">
                            Dan Abramov
                    </Heading>
                    <Text fontSize={12} color="gray.500">
                        Student at VCC CST
                    </Text>
                </Box>
            </Flex>
            <Text color="green.700" fontSize={14}>
                Im currently in my second year at Vancouver community college and Im currently preparing to join the workforce. With this CST job board I was able to find the resources needed to boost my career goals and be able to find different avenues for my career development.
            </Text>
        </Box>
    );
};