// 3rd Party Imports
import { Card, CardHeader, CardBody } from "@chakra-ui/react";

// Local Imports
import styles from "@/styles/JobPostings.module.sass";


export default function EventCardComponent () {
    return (
        <Card bg={"#566157"} maxW={"300px"} maxH={"200px"} p={"1vh"} borderRadius={"3xl"} my={"30px"}>
            <CardHeader>
                <h1 className={styles.announcementDate}>JAN 23</h1>
            </CardHeader>
            <CardBody>
                <p className={styles.announcementTitle}>VCC Alumni Week -Songwriter&apos;s Circle</p>
                <p className={styles.announcementDesc}>Join two music professionals for this free public event {">"}</p>
            </CardBody>
        </Card>
    );
};


