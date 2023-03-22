// Third-party imports
import { Box, Flex, Card, CardHeader, CardBody } from "@chakra-ui/react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { red } from "@mui/material/colors";
import { useState } from "react";

// Local imports
import styles from "@/styles/JobPostings.module.sass";
import companyIcon from "@/../public/images/companyDefaultIcon.png";
import { instance } from "@/shared/axiosInstance";

const FavoriteBorderIcon = dynamic(() => import("@mui/icons-material/FavoriteBorder"));
const FavoriteIcon = dynamic(() => import("@mui/icons-material/Favorite"));

interface Props {
    id: string,
    image: string,
    name: string,
    address : string,
    job: string,
    type: string,
    liked: boolean,
    extraFunction?: (jobID: string) => void
}

export default function JobCardComponent(props: Props) {
    const [liked, setLiked] = useState<boolean>(props.liked);

    async function handleAddToLiked(id: string, action: string) {

        if(props.extraFunction && action !== "add") {

            props.extraFunction(id);
        }

        console.log(id);

        if (action === "add"){
            setLiked(true);
            const res = await instance.post("favorites", { id, action }).then(response => console.log(response)).catch(error => console.log(error));

            console.log(res);
        } else {
            setLiked(false);
            const res = await instance.post("favorites", { id, action }).then(response => console.log(response)).catch(error => console.log(error));
        }
    }

    return (
        <>
            <Card maxW={"330px"} minW={"280px"} minH={"300px"} maxH={"300px"} borderRadius={"3xl"} boxShadow={"dark-lg"} my={"5vh"}>
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
                                <h1 className={styles.jobCardCompany}>{props.name}</h1>
                                <p className={styles.jobCardLocation}>{props.address}</p>
                            </Box>
                        </Flex>
                    </Flex>
                </CardHeader>
                <CardBody ml={3} mt={-3} minH={"100px"}>
                    <h1 className={styles.jobCardTitle}>{props.job}</h1>
                    <p className={styles.jobCardType}>{props.type}</p>
                    {/* <p className={styles.jobCardPublished}>2d ago</p> */}
                </CardBody>
                <CardBody mr={3} mb={3}>
                    <Flex justify="flex-end">
                        { !liked ?
                            <div>
                                <button onClick={() => handleAddToLiked(props.id as string, "add")}>
                                    <FavoriteBorderIcon fontSize="large" />
                                </button>
                            </div>
                            :
                            <div>
                                <button onClick={() => handleAddToLiked(props.id as string, "remove")}>
                                    <FavoriteIcon fontSize="large" sx={{ color: red[500] }}/>
                                </button>
                            </div>
                        }
                    </Flex>
                </CardBody>
            </Card>
        </>
    );
};
