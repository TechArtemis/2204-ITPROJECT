import {
    Button,
    Checkbox,
    Flex,
    Text,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
    Image,
    InputGroup,
    InputRightElement,
} from "@chakra-ui/react";
import React, { SetStateAction, useState } from "react";
import { signIn } from "next-auth/react";
import router from "next/router";
import { getToken } from "next-auth/jwt";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import Navbar from "@/components/navbar";
import styles from "@/styles/components.module.sass";
import { PASSWORD_REGEX, STUDENT_EMAIL_REGEX } from "@/shared/regex";


export default function LogIn() {

    const [showPassword, setShowPassword] = useState(false);
    const [input, setInput] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isEmailInvalid, setIsEmailInvalid] = useState(false);
    const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);

    const handleInputChange = (e: { target: { value: SetStateAction<string>; }; }) => setInput(e.target.value);

    const handleEmailChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;

        setEmail(val);
    };

    const handlePasswordChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;

        setPassword(val);
    };

    const handleLogin = async () => {
        if (!STUDENT_EMAIL_REGEX.test(email)) {
            setIsEmailInvalid(true);
        } else {
            setIsEmailInvalid(false);
        }
        if (!PASSWORD_REGEX.test(password)) {
            setIsPasswordInvalid(true);
        } else {
            setIsPasswordInvalid(false);
        }

        try {
            const response = await signIn("credentials", { redirect: false, email, password });

            if (response?.ok) {
                router.push("/home");
            } else {
                throw new Error("Email/Password Invalid");
            }
        } catch (error: any) {

        }
    };

    return (
        <>
            <div>
                <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
                    <Flex p={8} flex={1} align={"center"} justify={"center"}>
                        <Stack spacing={4} w={"full"} maxW={"md"}>
                            <Heading fontSize={"2xl"} fontFamily={"Lato-Bold"}>Sign in to your account</Heading>
                            <FormControl id="email" isInvalid={isEmailInvalid}>
                                <FormLabel>Email address</FormLabel>
                                <Input type='email' onChange={handleEmailChange} />
                                {!isEmailInvalid ? (
                                    <FormHelperText>
                                        Enter your VCC student email or personal CST alumni email
                                    </FormHelperText>
                                ) : (
                                    <FormErrorMessage>
                                        Invalid e-mail, please use a valid VCC e-mail
                                    </FormErrorMessage>
                                )}
                            </FormControl>
                            <FormControl id="password" isInvalid={isPasswordInvalid}>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input type={showPassword ? "text" : "password"} onChange={handlePasswordChange} />
                                    <InputRightElement h={"full"}>
                                        <Button
                                            variant={"ghost"}
                                            onClick={() =>
                                                setShowPassword((showPassword) => !showPassword)
                                            }>
                                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                {isPasswordInvalid &&
                                    <FormErrorMessage>
                                        Incorrect password
                                    </FormErrorMessage>
                                }
                            </FormControl>
                            <Stack spacing={8}>
                                <Stack
                                    direction={{ base: "column", sm: "row" }}
                                    align={"start"}
                                    justify={"space-between"}>
                                </Stack>
                                <Button colorScheme={"green"} variant={"solid"} onClick={handleLogin}>
                                    Sign in
                                </Button>
                                <Text align={"center"}>
                                    <Link as={NextLink} href='./signup' color={"green.400"} >Sign up</Link> for an account
                                </Text>
                            </Stack>
                        </Stack>
                    </Flex>
                    <Flex flex={1}>
                        <Image
                            alt={"Login Image"}
                            objectFit={"cover"}
                            src={"./images/SchoolVCC2.jpg"}
                        />
                    </Flex>
                </Stack>
            </div>
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
    if (token) {
        return { redirect: { destination: "/home", permanent: false } };
    }

    return {
        props: {}
    };
}

// REDO signup page to fit with login page card