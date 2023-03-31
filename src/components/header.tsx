// Third-party imports
import { Flex, Heading, Icon, Link, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spacer } from "@chakra-ui/react";
import { FaSignInAlt } from "react-icons/fa";
import dynamic from "next/dynamic";
import NextLink from "next/link";

// Dynamic Imports
const MenuIcon = dynamic(() => import("@mui/icons-material/Menu"));

export default function Header(){
	return (
		<Flex
			px={["50px", "50px", "200px", "200px"]}
			py="30px"
			width="full"
			bg="green.900"
			alignItems="flex-end"
			justifyContent="space-between"
		>

			<Flex alignItems="flex-end" flexDirection="row" color="whiteAlpha.700" w="100%">
				<Flex display={["inline", "inline", "inline", "inline", "none"]}>
					<Menu>
						<MenuButton>
							<MenuIcon style={{ fontSize: 36 }}/>
						</MenuButton>
						<MenuList>
							<Link as={NextLink} href='./'>
								<MenuItem color="black">
									Home
								</MenuItem>
							</Link>

							<MenuDivider />

							<Link href='https://www.vcc.ca/programs/computer-systems-technology/' isExternal>
								<MenuItem color="black">
									Programs and Courses
								</MenuItem>
							</Link>

							<MenuDivider />

							<Link as={NextLink} href='./login'>
								<MenuItem color="black">
									Job Postings
								</MenuItem>
							</Link>

							<MenuDivider />

							<Link as={NextLink} href='./login'>
								<MenuItem color="black">
									Company Job Form
								</MenuItem>
							</Link>

							<MenuDivider />

							<Link as={NextLink} href='/login' alignContent="center">
								<MenuItem color="black">
                					Login
								</MenuItem>
							</Link>

						</MenuList>
					</Menu>
				</Flex>


				<Heading display={["none", "none", "none", "none", "inline"]} w="250px" color="whiteAlpha.900" mr="30px" fontFamily={"Lato-Bold"} fontSize={20} letterSpacing="1.5px">
                    Vancouver Community College
				</Heading>

				<Spacer/>

				<Flex display={["none", "none", "none", "none", "inline"]} flexDirection="row">
					<Link as={NextLink} href='./' mx="10px">
						Home
					</Link>

					<Link href='https://www.vcc.ca/programs/computer-systems-technology/' mx="10px" isExternal>
						Programs and Courses
					</Link>

					<Link as={NextLink} mx="10px" href='./login'>
						Job Postings
					</Link>

					<Link as={NextLink} mx="10px" href='./login'>
						Company Job Form
					</Link>

					<Link as={NextLink} mx="10px" href='/login' color="whiteAlpha.800">
                		Login
						<Icon as={FaSignInAlt} ml="12px" h={5} w={5} />
					</Link>
				</Flex>

			</Flex>
		</Flex>
	);
};

