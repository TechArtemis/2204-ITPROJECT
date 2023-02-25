import React from "react";
import { Box, HStack, Heading } from "@chakra-ui/react";
import { CoopWorkMethodCard } from "@/components/CoopWorkMethodCard";

export const HowWeWork = () => {
    return (
        <Box w="full" px="200px" py="60px">
            <Heading fontSize={42} letterSpacing="4px" color="green.900" pb="80px">
                How does CO-OP work?
            </Heading>
            <HStack w="full" alignItems="flex-Start" spacing="75px">
                <CoopWorkMethodCard imagePath="./images/stockimage1.jpg" heading="Career Services" description="VCC offers a variety of career services to help students prepare for and navigate the job market. These services may include career counseling, job search assistance, resume and cover letter reviews, interview coaching, networking opportunities, and access to job postings and career fairs."
                />
                <CoopWorkMethodCard imagePath="./images/stockimage3.jpg" heading="Resume building" description="A resume is an important tool for your job search as it offers a page or two where you can display your relevant skills and qualities for a job. Resumes help employers make hiring decisions and help you get your first interview. That's why it matters how you structure your resume and what information you decide to include."
                />
                <CoopWorkMethodCard imagePath="./images/stockimage2.jpg" heading="Job Postings" description="Companies that are interested in hiring co-op students will usually post job listings on various job boards or their own company website, specifying the requirements for the position, such as the skills and qualifications necessary. Co-op students can then apply for these positions by submitting their resume and cover letter, and if they meet the requirements, they may be invited to an interview or further assessment. Often, co-op positions are designed to provide students with real-world work experience and an opportunity to apply their skills in a professional setting. In addition, co-op positions may offer students the chance to network and build relationships with professionals in their field, which can be beneficial for their future careers."
                />
            </HStack>
        </Box>
    );
};

export default HowWeWork;