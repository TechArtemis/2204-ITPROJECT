/* eslint-disable react/jsx-key */
// 3rd Party Imports
import { Box, Flex, Grid, GridItem, Divider, Center } from "@chakra-ui/react";
import Image from "next/image";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/scss/alice-carousel.scss";
// Local Imports
import EventCardComponent from "@/components/eventCardComponent";
import JobCardComponent from "@/components/jobCardComponent";
import StudentsBanner from "@/../public/images/studentsBanner.png";
import styles from "@/styles/JobPostings.module.sass";
import { getToken } from "next-auth/jwt";
import Navbar from "@/components/navbar";

export default function JobPostings() {
    const responsive = {
        // 0: {
        //     items: 1,
        //     itemsFit: "contain"
        // },
        // 568: {
        //     items: 1,
        //     itemsFit: "contain"
        // },
        796: {
            items: 1,
            itemsFit: "contain"
        },
        910: {
            items: 2,
            itemsFit: "contain"
        },
        1024: {
            items: 2,
            itemsFit: "contain"
        },
        1252: {
            items: 3,
            itemsFit: "contain"
        },
        1480: {
            items: 4,
            itemsFit: "contain"
        }
    };

    const items = [
        <div className="item" data-value="1">
            <JobCardComponent/>
        </div>,
        <div className="item" data-value="2">
            <JobCardComponent/>
        </div>,
        <div className="item" data-value="3">
            <JobCardComponent/>
        </div>,
        <div className="item" data-value="4">
            <JobCardComponent/>
        </div>,
        <div className="item" data-value="5">
            <JobCardComponent/>
        </div>,
        <div className="item" data-value="6">
            <JobCardComponent/>
        </div>
    ];

    return (
        <>
            <Navbar/>
            <Box bg={"gray.500"} w={"100%"} h={"50vh"} mt={180} color={"white"}>
                <div className={styles.bannerContainer}>
                    <Image className={styles.bannerImage} src={StudentsBanner} alt="Students banner"/>
                    <h1 className={styles.bannerTitle}>VCC Co-op<br/>
                        <span className={styles.bannerCaption}>
                            This is a caption that&apos;ll describe what the VCC Co-op Page is supposed to offer for students
                        </span>
                    </h1>
                </div>
            </Box>
            <Flex>
                <Flex display={["none", "none", "flex", "flex"]}>
                    <Box bg={"#485049"} minW={"380px"} h={"1350px"} color={"white"}>
                        <Grid>
                            <GridItem>
                                <Center>
                                    <EventCardComponent/>
                                </Center>
                            </GridItem>

                            <Center>
                                <Divider w={"60%"} borderColor={"gray.300"}/>
                            </Center>

                            <GridItem>
                                <Center>
                                    <EventCardComponent/>
                                </Center>
                            </GridItem>

                            <Center>
                                <Divider w={"60%"} borderColor={"gray.300"}/>
                            </Center>

                            <GridItem>
                                <Center>
                                    <EventCardComponent/>
                                </Center>
                            </GridItem>

                            <Center>
                                <Divider w={"60%"} borderColor={"gray.300"}/>
                            </Center>

                            <GridItem>
                                <Center>
                                    <EventCardComponent/>
                                </Center>
                            </GridItem>
                        </Grid>
                    </Box>
                </Flex>

                <Box bg={"white"} w={"100%"} h={"125vh"}>
                    <h1 className={styles.jobListTitle}>Latest Jobs</h1>
                    <Flex>
                        <AliceCarousel
                            mouseTracking
                            items={items}
                            responsive={responsive}
                            controlsStrategy="alternate"
                        />

                    </Flex>

                    <h1 className={styles.jobListTitle}>Based on your career interests</h1>
                    <Flex>
                        <AliceCarousel
                            mouseTracking
                            items={items}
                        />
                    </Flex>
                </Box>
            </Flex>
        </>
    );
}

export async function getServerSideProps(context: { [key: string]: any }) {
    const secret = process.env.NEXTAUTH_SECRET;
    const token = await getToken(
        {
            req: context.req,
            secret: secret
        }
    );

    // If the user is already logged in, redirect.
    // Note: Make sure not to redirect to the same page
    // To avoid an infinite loop!
    if (!token) {
        return { redirect: { destination: "/", permanent: false } };
    }

    return {
        props: {}
    };
}