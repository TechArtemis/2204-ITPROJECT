// Third-party imports
import React from "react";
import NextLink from "next/link";
import { Box, Flex, Heading, Icon, Link, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { FaSignInAlt } from "react-icons/fa";

export default function ServiceCard ({
	icon,
	heading,
	description,
}: {
    icon: IconType;
    heading: string;
    description: string;
}) {
	return (<Flex flexDirection="column" bg="yellow.50" p="40px" w="full" height="380px" justifyContent="space-between">
		<Icon color="green.900" h={20} w={20} as={icon} />
		<Box>
			<Heading color="green.900" fontSize={28} fontFamily={"Lato-Bold"} letterSpacing="3px">{heading}</Heading>
			<Text color="green.700" >{description}</Text>
		</Box>
		<Link as={NextLink} href='./login' color="green.800">
            Explore more
			<Icon as={FaSignInAlt} ml="10px" h={5} w={5} />
		</Link>
	</Flex>
	);
};