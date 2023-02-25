import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Image,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    FormHelperText,
    FormErrorMessage,
} from "@chakra-ui/react";
import { SetStateAction, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { EMAIL_REGEX, PASSWORD_REGEX } from "@/shared/regex";
import { isValidStr } from "@/shared/stringCheck";
import { Alumni } from "@/interface/Alumni";
import { instance } from "@/shared/axiosInstance";
import router from "next/router";
import { signIn } from "next-auth/react";
import { getToken } from "next-auth/jwt";

export default function SignupCard() {
    const [showPassword, setShowPassword] = useState(false);
    const [input, setInput] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");

    const handleInputChange = (e: { target: { value: SetStateAction<string>; }; }) => setInput(e.target.value);

    const handleEmailChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;

        setEmail(val);
    };

    const handlePasswordChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;

        setPassword(val);
    };

    const handleFNameChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;

        setFName(val);
    };

    const handleLNameChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;

        setLName(val);
    };

    const handleSubmit = async() => {
        if (!EMAIL_REGEX.test(email)) {

        }
        if (!PASSWORD_REGEX.test(password)) {

        }
        if (!isValidStr(fName) || !isValidStr(lName)) {

        }
        const name = fName + " " + lName;
        const alumni : Alumni = {
            name,
            email,
            password,
            favorites: []
        };
        const obj = {
            alumni
        };
        try {
            const { data } = await instance.post("alumni/create", obj);
            const response = await signIn("credentials", { redirect: false, email, password });
            console.log(response);
            if(response?.ok) {
                router.push("/home");
            }
        } catch(error: any) {
            console.log("NETWORK ERROR", error);
        }
    };

    const isError = input === "";

    return (
        <>
            <div>
                <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
                    <Flex
                        p={8}
                        flex={1}
                        minH={"100vh"}
                        align={"center"}
                        justify={"center"}
                        bg={useColorModeValue("gray.50", "gray.800")}>
                        <Stack spacing={8} mx={"auto"} w={"full"} maxW={"lg"} py={12} px={6}>
                            <Stack align={"center"}>
                                <Heading fontSize={"4xl"} textAlign={"center"}>
                        Sign up
                                </Heading>
                                <Text fontSize={"lg"} color={"gray.600"}>
                        to see the VCC CST job board
                                </Text>
                            </Stack>
                            <Box
                                rounded={"lg"}
                                bg={useColorModeValue("white", "gray.700")}
                                boxShadow={"lg"}
                                p={8}>
                                <Stack spacing={4}>
                                    <HStack>
                                        <Box>
                                            <FormControl id="firstName" isRequired>
                                                <FormLabel>First Name</FormLabel>
                                                <Input type="text" onChange={handleFNameChange} />
                                            </FormControl>
                                        </Box>
                                        <Box>
                                            <FormControl id="lastName" isRequired>
                                                <FormLabel>Last Name</FormLabel>
                                                <Input type="text" onChange={handleLNameChange} />
                                            </FormControl>
                                        </Box>
                                    </HStack>
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
                                    <FormControl id="password" isInvalid={isError}>
                                        <FormLabel>Password</FormLabel>
                                        <InputGroup>
                                            <Input type={showPassword ? "text" : "password"} onChange={handlePasswordChange} />
                                            {!isError ? (
                                                <FormHelperText>
                                        Enter Password
                                                </FormHelperText>
                                            ) : (
                                                <FormErrorMessage>Password is required.</FormErrorMessage>
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
                                    <Stack spacing={10} pt={2}>
                                        <Button
                                            loadingText="Submitting"
                                            size="lg"
                                            bg={"green.400"}
                                            color={"white"}
                                            _hover={{
                                                bg: "green.500",
                                            }} onClick={handleSubmit}>
                                Sign up
                                        </Button>
                                    </Stack>
                                    <Stack pt={6}>
                                        <Text align={"center"}>
                                Already a user? <Link as={NextLink} href='./login' color={"green.400"} >Login</Link>
                                        </Text>
                                    </Stack>
                                </Stack>
                            </Box>
                        </Stack>
                    </Flex>
                    <Flex flex={1}>
                        <Image
                            alt={"Sign Up Image"}
                            objectFit={"cover"}
                            src={
                                "./images/studentsBanner.png"
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
