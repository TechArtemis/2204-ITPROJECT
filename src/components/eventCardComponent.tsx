// Third-party imports
import { Card, CardHeader, CardBody } from "@chakra-ui/react";

// Local imports
import styles from "@/styles/JobPostings.module.sass";

interface Props {
    name: string,
    description: string,
    link: string
}

export default function EventCardComponent (props: Props) {
    return (
        <Card bg={"#566157"} maxW={"300px"} maxH={"200px"} p={"1vh"} borderRadius={"3xl"} my={"30px"}>
            <CardHeader>
                <h1 className={styles.announcementTitle}>{props.name}</h1>
            </CardHeader>
            <CardBody>
                <a href={props.link}>
                    <p className={styles.announcementDescription}>{props.description} {">"}</p>
                </a>
            </CardBody>
        </Card>
    );
};


