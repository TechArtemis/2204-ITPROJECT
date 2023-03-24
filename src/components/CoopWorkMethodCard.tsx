// Third-party imports
import { AspectRatio, Box, Heading, Img, Text } from "@chakra-ui/react";
import React from "react";

export const CoopWorkMethodCard = ({ imagePath, heading, description }: { imagePath: string; heading: string; description: string }) => {
	return (
		<Box w="full">
			<AspectRatio ratio={5 / 7}>
				<Img src={imagePath} pb="30px" />
			</AspectRatio>
			<Heading fontSize="24px" fontFamily={"Lato-Bold"} color="green.900" pb="20px">{heading}</Heading>
			<Text color="green.700" fontSize="14px">{description}</Text>
		</Box>
	);
};
