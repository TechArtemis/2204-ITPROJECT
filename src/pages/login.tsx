import Head from "next/head";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaGoogle, FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";

export default function Register() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
            <Head>
                <title>Vancouver CST</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="flex flex-cold items-center justify-center w-full flex-1 px-20 text-center">
                <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
                    <div className="w-3/5 p-5">
                        <div className="text-left font-bold">
                            {/* <span className="text-green-500">Vancouver Community College CST</span>  */} {/* replace placeholder text with logo */}
                        </div>
                        <div className="py-10">
                            <h2 className="text-3xl font-bold text-green-500 mb-2">Sign in to Account</h2>
                            <div className="border-2 w-10 border-green-500 inline-block mb-2"></div>
                            <div className="flex justify-center my-2">
                                <a href="#" className="border-2 border-gray-200 rounded-full p-3 mx-1">
                                    <FaFacebookF className="text-sm" />
                                </a>
                                <a href="#" className="border-2 border-gray-200 rounded-full p-3 mx-1">
                                    <FaLinkedinIn className="text-sm" />
                                </a>
                                <a href="#" className="border-2 border-gray-200 rounded-full p-3 mx-1">
                                    <FaGoogle className="text-sm" />
                                </a>
                            </div> {/* Single Sign on Service */}
                            <p className="text-gray-400 my-3"> or use your email account</p>
                            <div className="flex flex-col items-center">
                                <div className="bg-gray-100 w-64 p-2 flex items-center rounded-xl border-2 border-gray-300">
                                    <FaRegEnvelope className="text-gray-400 m-2"/>
                                    <input type="email" name="email" placeholder="Email" className="bg-gray-100 outline-non text-sm flex-1"/>
                                </div>
                                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3 rounded-xl border-2 border-gray-300">
                                    <MdLockOutline className="text-gray-400 border-gray m-2"/>
                                    <input type="password" name="password" placeholder="Password" className="bg-gray-100 outline-non text-sm flex-1"/>
                                </div>
                                <div className="flex justify-between w-64 mb-5">
                                    <label className="flex items-center text-xs mr-1"><input type="checkbox" name="remember" className="mr-1"/> Remember me</label>
                                    <Link href="./emailResetForm" className="text-xs">Forgot Password?</Link>
                                </div>
                                <a href="./jobPostings" className="border-2 border-green-500 text-green-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-green-500 hover:text-white">Login</a>
                            </div>
                        </div>
                    </div>
                    {/* Sign in section */}
                    <div className="w-2/5 bg-[url('/images/SchoolVCC2.jpg')] bg-center bg-cover text-stone-200 rounded-tr-2xl rounded-br-2xl py-36 px-12">
                        <h2 className="text-3xl font-bold mb-2">VCC CST</h2>
                        <div className="border-2 w-10 border-stone-200 inline-block mb-2"></div>
                        <p className="mb-2">Sign up with your school email and start your journey!</p>
                        <a href="./signup" className="border-2 border-stone-200 rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-green-500">Sign up</a>
                    </div>
                    {/* Sign up section */}
                </div>
            </main>
        </div>
    );
}