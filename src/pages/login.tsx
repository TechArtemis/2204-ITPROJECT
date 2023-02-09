import {
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
    Image,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { SetStateAction, useState } from "react";
import { signIn } from "next-auth/react";
import router from "next/router";
import { getToken } from "next-auth/jwt";

export default function LogIn() {

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
                    <FormControl id="password" isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input type="password" onChange={handlePasswordChange}/>
                    </FormControl>
                    <div>{ email }</div>
                    <div>{ password }</div>
                    <Stack spacing={6}>
                        <Stack
                            direction={{ base: "column", sm: "row" }}
                            align={"start"}
                            justify={"space-between"}>
                            <Checkbox>Remember me</Checkbox>
                            <Link as={NextLink} href='./emailResetForm' color={"green.500"}>Forgot password?</Link>
                        </Stack>
                        <Button colorScheme={"green"} variant={"solid"} onClick={ handleLogin }>
                            Sign in
                        </Button>
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
        return { redirect: { destination: "/", permanent: false } };
    }

    return {
        props: {}
    };
}