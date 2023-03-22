// Third-party imports
import { Flex, Heading, HStack, Icon, Link } from "@chakra-ui/react";
import { FaSignInAlt } from "react-icons/fa";
import NextLink from "next/link";

export default function Header(){
    return (
        <Flex
            px="200px"
            py="30px"
            width="full"
            bg="green.900"
            alignItems="flex-end"
            justifyContent="space-between"
        >

            <Flex alignItems="flex-end">
                <HStack color="whiteAlpha.700" spacing="40px">
                    <Heading color="whiteAlpha.900" mr="30px" fontFamily={"Lato-Bold"} fontSize={20} letterSpacing="1.5px">
                    Vancouver Community College
                    </Heading>
                    <Link as={NextLink} href='./'>Home</Link>
                    <Link href='https://www.vcc.ca/programs/computer-systems-technology/' isExternal>Programs and Courses</Link>
                    <Link as={NextLink} href='./login'>Job Postings</Link>
                    <Link as={NextLink} href='./login'>Company Job Form</Link>
                </HStack>
            </Flex>
            <Link as={NextLink} href='/login' color="whiteAlpha.800">
                Login to your account
                <Icon as={FaSignInAlt} ml="10px" h={5} w={5} />
            </Link>
        </Flex>
    );
};

