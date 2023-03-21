/* eslint-disable react/jsx-key */

// Third-party imports
import { Box, Flex, Grid, GridItem, Divider, Center, Button, Text, SimpleGrid } from "@chakra-ui/react";
import Image from "next/image";

// local Imports
import EventCardComponent from "@/components/eventCardComponent";
import JobCardComponent from "@/components/jobCardComponent";
import StudentsBanner from "@/../public/images/studentsBanner.png";
import styles from "@/styles/JobPostings.module.sass";
import { getToken } from "next-auth/jwt";
import Navbar from "@/components/navbar";
import { JobPosting } from "@/interface/JobPosting";
import { getAllPosting } from "@/backend/actions/jobPosting";
import { getFavorites } from "@/backend/actions/user";

interface Props {
    jobs: JobPosting[];
    favorites: JobPosting[];
}

export default function JobPostings(props: Props) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3
    };

    const items = props.jobs.map((post: JobPosting, idx) => (
        <div className="item" data-value={idx.toString()} key={idx}>
            <JobCardComponent
                id={post._id as string}
                image={post.companyImage}
                name={post.companyName}
                address={post.companyLocation[0].location.city}
                job={post.jobTitle}
                type={post.jobType}
                liked={props.favorites.filter((fav => fav._id as string === post._id as string)).length === 1}
            />
        </div>
    ));

    return (
        <>
            <Navbar/>
            <Box bg={"gray.500"} w={"100%"} h={"50vh"} mt={50} color={"white"}>
                <div className={styles.bannerContainer}>
                    <Image className={styles.bannerImage} src={StudentsBanner} alt="Students banner" />
                    <h1 className={styles.bannerTitle}>VCC Co-op<br/>
                        <span className={styles.bannerCaption}>
                            This is a caption that&apos;ll describe what the VCC Co-op Page is supposed to offer for students
                        </span>
                    </h1>
                </div>
            </Box>
            <Flex>
                <Flex display={["none", "none", "flex", "flex"]}>
                    <Box bg={"#485049"} minW={"380px"} h={"100%"} color={"white"}>
                        <Grid>
                            <GridItem>
                                <Center>
                                    <EventCardComponent
                                        name={"Learning Centre"}
                                        description={"The Learning Centre is here to support you in preparing to apply for a job"}
                                        link={"https://learningcentre.vcc.ca/learning-centre/resources/career-skills/#gsc.tab=0"}
                                    />
                                </Center>
                            </GridItem>

                            <Center>
                                <Divider w={"60%"} borderColor={"gray.300"}/>
                            </Center>

                            <GridItem>
                                <Center>
                                    <EventCardComponent
                                        name={"Skills Assessments"}
                                        description={"Check your skill level with Linkedin's skill assessment"}
                                        link={"https://www.linkedin.com/skill-assessments/hub/quizzes/"}
                                    />
                                </Center>
                            </GridItem>

                            <Center>
                                <Divider w={"60%"} borderColor={"gray.300"}/>
                            </Center>

                            <GridItem>
                                <Center>
                                    <EventCardComponent
                                        name={"Career Skills"}
                                        description={"Get your read for job hunting and informational interviews"}
                                        link={"https://libguides.vcc.ca/careerskills"}
                                    />
                                </Center>
                            </GridItem>

                            <Center>
                                <Divider w={"60%"} borderColor={"gray.300"}/>
                            </Center>

                            <GridItem>
                                <Center>
                                    <EventCardComponent
                                        name={"Career Guidance"}
                                        description={"VCC can help with all your employment and hiring needs."}
                                        link={"https://www.vcc.ca/services/services-for-students/career-guidance/welcome/"}
                                    />
                                </Center>
                            </GridItem>
                        </Grid>
                    </Box>
                </Flex>

                <Box bg={"white"} w={"100%"}>
                    <h1 className={styles.jobListTitle}>Latest Jobs</h1>

                    <SimpleGrid columns={{ sm: 1, lg: 2, xl: 3, "2xl": 4 }} spacing={2} ml={"5vh"}>
                        {
                            props.jobs.slice(-4).map((post: JobPosting, idx) => (
                                <GridItem key={idx}>
                                    <JobCardComponent
                                        id={post._id as string}
                                        image={post.companyImage}
                                        name={post.companyName}
                                        address={post.companyLocation[0].location.city}
                                        job={post.jobTitle}
                                        type={post.jobType}
                                        liked={props.favorites.filter((fav => fav._id as string === post._id as string)).length === 1}
                                    />
                                </GridItem>
                            ))
                        }
                    </SimpleGrid>


                    <h1 className={styles.jobListTitle}>Based on your career interests</h1>
                    <SimpleGrid columns={{ sm: 1, lg: 2, xl: 3, "2xl": 4 }} spacing={2} ml={"5vh"}>
                        {
                            props.jobs.slice(-4).map((post: JobPosting, idx) => (
                                <GridItem key={idx}>
                                    <JobCardComponent
                                        id={post._id as string}
                                        image={post.companyImage}
                                        name={post.companyName}
                                        address={post.companyLocation[0].location.city}
                                        job={post.jobTitle}
                                        type={post.jobType}
                                        liked={props.favorites.filter((fav => fav._id as string === post._id as string)).length === 1}
                                    />
                                </GridItem>
                            ))
                        }
                    </SimpleGrid>
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

    const jobs = await getAllPosting();
    const { message: favorites } = await getFavorites(token.email as string);

    return {
        props: {
            jobs: JSON.parse(JSON.stringify(jobs.message)),
            favorites: JSON.parse(JSON.stringify(favorites))
        }
    };
}