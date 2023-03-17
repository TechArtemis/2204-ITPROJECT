//third-party imports
import { Box, Flex, Card, CardHeader, CardBody } from "@chakra-ui/react";
import Image from "next/image";

// Local Imports
import styles from "@/styles/JobPostings.module.sass";
import heartIcon from "@/../public/images/heartIcon.png";
import companyIcon from "@/../public/images/companyDefaultIcon.png";

export default function JobCardComponent() {
    return (
        <>
            <Card maxW={"330px"} minW={"280px"} borderRadius={"3xl"} boxShadow={"dark-lg"} ml={"5vh"} my={"5vh"}>
                <CardHeader m={3}>
                    <Flex>
                        <Flex flex={"1"} gap={"6"} alignItems={"center"} flexWrap={"wrap"}>
                            <Image
                                src={companyIcon}
                                alt="Company Icon"
                                width={40}
                                height={40}
                            />
                            <Box>
                                <h1 className={styles.jobCardCompany}>Arbutus Search Group Inc.</h1>
                                <p className={styles.jobCardLocation}>Multiple locations</p>
                            </Box>
                        </Flex>
                    </Flex>
                </CardHeader>
                <CardBody ml={3} mt={-3}>
                    <h1 className={styles.jobCardTitle}>Computer Systems Engineer</h1>
                    <p className={styles.jobCardType}>Full-time</p>
                    <p className={styles.jobCardPublished}>2d ago</p>
                </CardBody>
                <CardBody mr={3} mb={3}>
                    <Flex justify="flex-end">
                        <Image
                            src={heartIcon}
                            alt="Heart Icon"
                            width={30}
                            height={30}
                        />
                    </Flex>
                </CardBody>
            </Card>
        </>
    );
};
