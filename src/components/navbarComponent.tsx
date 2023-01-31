// 3rd Party Imports
import { useEffect, useState } from "react";
import { Flex, IconButton, Button } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Image from "next/image";
import Link from "next/link";
// Local Imports
import vccLogo from "@/../public/images/vccLogo.png";
import defaultProfile from "@/../public/images/defaultProfile.png";
import styles from "@/styles/JobPostings.module.sass";

const LoggedInHeaderComponent = () => {
    const [display, changeDisplay] = useState("none");
    useEffect(() => changeDisplay("none"), []);

    return (
        <>
            <Flex>
                {/* Left side of the Nav Bar */}
                <Flex
                    pos={"absolute"}
                    top={"1rem"}
                    left={"19%"}
                    align={"center"}>
                    {/* VCC Logo */}
                    <Flex>
                        <Image
                            src={vccLogo}
                            alt="VCC Logo"
                            width={160}
                            height={160}
                        />
                    </Flex>
                </Flex>
                {/* Right side of the Nav Bar */}
                <Flex
                    pos={"absolute"}
                    top={"2rem"}
                    right={"19%"}
                    align={"center"}>
                    {/* This will make it so that it'll make a hamburder icon halfway through the screen */}
                    <Flex
                        display={["none", "none", "none", "none", "flex"]}>
                        {/* Find Co-op button */}
                        <Link href="#">
                            <Button
                                variant={"ghost"}
                                aria-label={"Find Co-op"}
                                my={5}
                                px={5}
                                w={"100%"}
                            >
                                <p className={styles.navbarText}>Find Co-op</p>
                            </Button>
                        </Link>
                        {/* Liked button */}
                        <Link href="#">
                            <Button
                                variant={"ghost"}
                                aria-label={"Liked"}
                                my={5}
                                px={5}
                                w={"100%"}
                            >
                                <p className={styles.navbarText}>Liked</p>
                            </Button>
                        </Link>
                        {/* Resources button */}
                        <Link href="#">
                            <Button
                                variant={"ghost"}
                                aria-label={"Resources"}
                                my={5}
                                px={5}
                                pr={16}
                                w={"100%"}
                            >
                                <p className={styles.navbarText}>Resources</p>
                            </Button>
                        </Link>
                        {/* Profile Picture button */}
                        <Link href="#">
                            <Button
                                variant={"ghost"}
                                aria-label={"Resources"}
                                my={5}
                                w={"100%"}>

                                <Image
                                    src={defaultProfile}
                                    alt={"Default profile picture"}
                                    width={60}
                                    height={60}
                                />
                            </Button>
                        </Link>
                    </Flex>
                    {/* This hamburger icon will only appear when the X button disappears */}
                    <IconButton
                        aria-label={"Open Menu"}
                        size={"lg"}
                        mr={2}
                        icon={<HamburgerIcon/>}
                        display={["flex", "flex", "flex", "flex", "none"]}
                        onClick={() => changeDisplay("flex")}
                    />
                </Flex>
                {/* This will create a pop up bar when the hamburger icon is clicked */}
                <Flex
                    w={"100vw"}
                    bgColor={"gray.50"}
                    zIndex={20}
                    h={"100vh"}
                    pos={"fixed"}
                    top={"0"}
                    left={"0"}
                    overflowY={"auto"}
                    flexDir={"column"}
                    display={display}
                >
                    {/* Button to close the pop-up menu */}
                    <Flex justify="flex-end">
                        <IconButton
                            aria-label={"Open Menu"}
                            size={"lg"}
                            mr={10}
                            mt={5}
                            icon={<CloseIcon/>}
                            display={"flex"}
                            onClick={() => changeDisplay("none")}
                        />
                    </Flex>
                    {/* Make the flex as a column */}
                    <Flex
                        flexDir="column"
                        align="center"
                    >
                        {/* Pop-up Find Co-op button */}
                        <Link href="#" passHref>
                            <Button
                                as={"a"}
                                variant={"ghost"}
                                aria-label={"Find Co-op"}
                                my={5}
                                w={"100%"}
                            >
                                <p>Find Co-op</p>
                            </Button>
                        </Link>
                        {/* Pop-up Liked button */}
                        <Link href="#" passHref>
                            <Button
                                as={"a"}
                                variant={"ghost"}
                                aria-label={"Liked"}
                                my={5}
                                w={"100%"}
                            >
                                <p>Liked</p>
                            </Button>
                        </Link>
                        {/* Pop-up Resources button */}
                        <Link href="#" passHref>
                            <Button
                                as={"a"}
                                variant={"ghost"}
                                aria-label={"Resources"}
                                my={5}
                                w={"100%"}
                            >
                                <p>Resources</p>
                            </Button>
                        </Link>
                        {/* Pop-up Profile button */}
                        <Link href="#" passHref>
                            <Button
                                as={"a"}
                                variant={"ghost"}
                                aria-label={"Profile"}
                                my={5}
                                w={"100%"}
                            >
                                <p>Profile</p>
                            </Button>
                        </Link>
                    </Flex>
                </Flex>
            </Flex>
        </>
    );
};

export default LoggedInHeaderComponent;