// Third-party imports
import React from "react";
import { AspectRatio, Box, Flex, Heading, Img, VStack } from "@chakra-ui/react";

// Local imports
import { Commitment } from "@/components/commitments";

export const Commitments = () => {
	return (
		<Flex pl="200px" background="green.900" justifyContent="space-between" alignItems="center">
			<Box py="60px" pr="140px">
				<Heading fontSize={42} fontFamily={"Lato-Bold"} letterSpacing="3px" color="whiteAlpha.900" pb="60px">
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
				<Img src="./images/studentsBanner.png" />
			</AspectRatio>
		</Flex>
	);
};

export default Commitments;