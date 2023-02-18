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


export default function LogIn() {

    const [showPassword, setShowPassword] = useState(false);
    const [input, setInput] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
        try {
            const response = await signIn("credentials", { redirect: false, email, password });

            if(response?.ok) {
                router.push("/");
            } else {
                throw new Error("Email/Password Invalid");
            }
        } catch (error: any) {

        }
    };

    const isError = input === "";

    return (
        <>
            <div>
                <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
                    <Flex p={8} flex={1} align={"center"} justify={"center"}>
                        <Stack spacing={4} w={"full"} maxW={"md"}>
                            <Heading fontSize={"2xl"}>Sign in to your account</Heading>
                            <FormControl id="email" isInvalid={isError}>
                                <FormLabel>Email address</FormLabel>
                                <Input type='email' onChange={handleEmailChange} />
                                {!isError ? (
                                    <FormHelperText>
                                Enter your VCC student email or personal CST alumni email
                                    </FormHelperText>
                                ) : (
                                    <FormErrorMessage>Email is required.</FormErrorMessage>
                                )}
                            </FormControl>
                            <FormControl id="password" isRequired isInvalid={isError}>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input type={showPassword ? "text" : "password"} onChange={handlePasswordChange}/>
                                    {!isError ? (
                                        <FormHelperText>
                                Enter Password
                                        </FormHelperText>
                                    ) : (
                                        <FormErrorMessage></FormErrorMessage>
                                    )}
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
                            </FormControl>
                            <Stack spacing={8}>
                                <Stack
                                    direction={{ base: "column", sm: "row" }}
                                    align={"start"}
                                    justify={"space-between"}>
                                </Stack>
                                <Button colorScheme={"green"} variant={"solid"} onClick={ handleLogin }>
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
                            src={
                                "./images/SchoolVCC2.jpg"
                            }
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

    console.log(token);

    // If the user is already logged in, redirect.
    // Note: Make sure not to redirect to the same page
    // To avoid an infinite loop!
    if (token) {
        return { redirect: { destination: "/", permanent: false } };
    }

    return {
        props: {}
    };
}

// REDO signup page to fit with login page card