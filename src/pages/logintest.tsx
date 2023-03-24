import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	Image,
	InputGroup,
	InputRightElement,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
	Link,
	FormHelperText,
	FormErrorMessage,
	VStack,
} from "@chakra-ui/react";

import React, { SetStateAction, useState } from "react";
import { signIn } from "next-auth/react";
import router from "next/router";
import { getToken } from "next-auth/jwt";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import NextLink from "next/link";

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

	async function handleLogin() {
		try {
			const response = await signIn("credentials", { redirect: false, email, password });

			if (response?.ok) {
				router.push("/home");
			} else {
				throw new Error("Email/Password Invalid");
			}
		} catch (error: any) {
		}
	}

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
								<Heading fontSize={"4xl"} textAlign={"center"} fontFamily={"Lato-Bold"}>
                        Sign In
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
									<VStack alignItems={"left"}>
										<Box>
											<FormControl id="email" isInvalid={isError} isRequired>
												<FormLabel>Email Address</FormLabel>
												<Input type="email" onChange={handleEmailChange} />
											</FormControl>
										</Box>
										<Box>
											<FormControl id="password" isRequired isInvalid={isError}>
												<FormLabel>Password</FormLabel>
												<InputGroup>
													<Input type={showPassword ? "text" : "password"} onChange={handlePasswordChange} />
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
										</Box>
									</VStack>
									<Stack spacing={10} pt={2}>
										<Button colorScheme={"green"} variant={"solid"} onClick={handleLogin}>
                                    Sign in
										</Button>
									</Stack>
									<Stack pt={6}>
										<Text align={"center"}>
											<Link as={NextLink} href='./signup' color={"green.400"} >Sign up</Link> for an account
										</Text>
									</Stack>
								</Stack>
							</Box>
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