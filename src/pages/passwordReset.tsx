import Head from "next/head";
import { FaRegEnvelope, FaAddressCard } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";


export default function PasswordReset() {
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
                            <h2 className="text-3xl font-bold text-green-500 mb-2">Password Reset</h2>
                            <div className="border-2 w-10 border-green-500 inline-block mb-2"></div>
                            <p className="text-gray-400 my-3"> Fill in information below</p>
                            <div className="flex flex-col items-center">
                                <div className="bg-gray-100 w-64 p-2 flex items-center rounded-xl border-2 border-gray-300 mb-2">
                                    <FaRegEnvelope className="text-gray-400 m-2"/>
                                    <input type="email" name="email" placeholder="Email" className="bg-gray-100 outline-non text-sm flex-1"/>
                                </div>
                                <div className="bg-gray-100 w-64 p-2 flex items-center rounded-xl border-2 border-gray-300 mb-2">
                                    <MdLockOutline className="text-gray-400 m-2"/>
                                    <input type="password" name="password" placeholder="Password" className="bg-gray-100 outline-non text-sm flex-1"/>
                                </div>
                                <div className="bg-gray-100 w-64 p-2 flex items-center rounded-xl border-2 border-gray-300 mb-2">
                                    <MdLockOutline className="text-gray-400 m-2"/>
                                    <input type="password" name="password" placeholder="Please re-enter your password" className="bg-gray-100 outline-non text-sm flex-1"/>
                                </div>
                                <a href="./" className="border-2 border-green-500 text-green-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-green-500 hover:text-white">Submit</a>
                            </div>
                        </div>
                    </div>
                    {/* Text Paragraph Placeholder */}
                    <div className="w-2/5 bg-[url('/images/SchoolVCC2.jpg')] bg-center bg-cover text-stone-200 rounded-tr-2xl rounded-br-2xl py-36 px-12">
                        <h2 className="text-3xl font-bold mb-2">VCC CST</h2>
                        <div className="border-2 w-10 border-stone-200 inline-block mb-2"></div>
                        <p className="mb-2">Sign up to join the CST student and alumni job board. This board will have employers from all over the world posting jobs and projects for CST students!</p>
                    </div>
                </div>
            </main>
        </div>
    );
}