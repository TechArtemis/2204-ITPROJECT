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
import { PASSWORD_REGEX, STUDENT_EMAIL_REGEX } from "@/shared/regex";
import { isValidStr } from "@/shared/stringCheck";
import { User } from "@/interface/User";
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
	const [isFNameInvalid, setIsFNameInvalid] = useState(false);
	const [isLNameInvalid, setIsLNameInvalid] = useState(false);
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

	const handleFNameChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const val = event.target.value;

		setFName(val);
	};

	const handleLNameChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const val = event.target.value;

		setLName(val);
	};

	const handleSubmit = async () => {
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
		if (!isValidStr(fName)) {
			setIsFNameInvalid(true);
		} else {
			setIsFNameInvalid(false);
		}

		if (!isValidStr(lName)) {
			setIsLNameInvalid(true);
		} else {
			setIsLNameInvalid(false);
		}

		const name = fName + " " + lName;
		const user: User = {
			name,
			email,
			password,
			favorites: []
		};
		const obj = {
			user
		};
		try {
			const { data } = await instance.post("user/create", obj);
			const response = await signIn("credentials", { redirect: false, email, password });

			if (response?.ok) {
				router.push("/home");
			}
		} catch (error: any) {
			console.log("NETWORK ERROR", error);
		}
	};

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
								<Image
									boxSize='150px'
									objectFit='contain'
									src='./images/vcc.png'
									alt='School logo'
								/>
								<Heading fontSize={"4xl"} textAlign={"center"} fontFamily={"Lato-Bold"}>
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
											<FormControl id="firstName" isInvalid={isFNameInvalid} isRequired>
												<FormLabel>First Name</FormLabel>
												<Input type="text" onChange={handleFNameChange} />
											</FormControl>
										</Box>
										<Box>
											<FormControl id="lastName" isInvalid={isLNameInvalid} isRequired>
												<FormLabel>Last Name</FormLabel>
												<Input type="text" onChange={handleLNameChange} />
											</FormControl>
										</Box>
									</HStack>
									<FormControl id="email" isInvalid={isEmailInvalid} isRequired>
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
									<FormControl id="password" isInvalid={isPasswordInvalid} isRequired>
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
                                                Password is required
                                            </FormErrorMessage>
										}
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
							src={"./images/studentsBanner.png"}
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
