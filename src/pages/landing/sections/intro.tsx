// Third-party imports
import React from "react";
import { AspectRatio, Box, Flex, Heading, Icon, Link, Text } from "@chakra-ui/react";
import { FaSignInAlt } from "react-icons/fa";

export const Intro = () => {
    return (
        <Box w="full" bg="green.900" px="200px" py="60px" mb="120px">
            <Flex justifyContent="space-between" alignItems="center" pb="80px">
                <Heading fontSize={54} fontFamily={"Lato-Bold"} letterSpacing="3px" color="whiteAlpha.900">People who care <br /> about your growth </Heading>
                <Box maxW="300px">
                    <Text color="whiteAlpha.700" pb="20px">
                        The VCC Co-op program provides post-secondary students with a work placement in the canadian workforce that allows them to explore the tech sector and expand their skills and competencies by working on projects that augment their field of study.
                    </Text>
                    <Link href='https://www.vcc.ca/services/services-for-students/career-guidance/welcome/' isExternal color="whiteAlpha.800">
                        Explore more
                        <Icon as={FaSignInAlt} ml="10px" h={5} w={5} />
                    </Link>
                </Box>
            </Flex>
            <AspectRatio w="full" ratio={16 / 9} mb="-200px" pb="60px">
                <iframe
                    title='VCC'
                    src='https://www.youtube.com/embed/BNfnLGPfvkg'
                    allowFullScreen
                />
            </AspectRatio>
        </Box>
    );
};

export default Intro;