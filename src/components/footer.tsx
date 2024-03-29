// Third-party imports
import React from "react";
import { Box, Heading, Icon, Link } from "@chakra-ui/react";
import { FaSignInAlt } from "react-icons/fa";

export default function Footer() {
	return (
		<Box w="full" bg="green.900" px={["50px", "100px", "200px", "200px"]} py="180px" textAlign="center">
			<Heading
				color="white"
				fontSize={46}
				letterSpacing="3px"
				textAlign="center"
				pb="80px"
				fontFamily={"Lato-Bold"}
			>
                Want to take the next step in your Career? <br /> Join the VCC Co op
			</Heading>
			<Link href='https://www.vcc.ca/about/college-information/contact-us/' isExternal color="whiteAlpha.800">
                Get in touch
				<Icon as={FaSignInAlt} ml="10px" h={5} w={5} />
			</Link>
		</Box>
	);
};

