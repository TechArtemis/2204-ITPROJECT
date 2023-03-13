import { User } from "@/interface/User";
import { STUDENT_EMAIL_REGEX, PASSWORD_REGEX } from "@/shared/regex";
import { isValidStr } from "@/shared/stringCheck";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { createUser } from "@/backend/actions/user";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // post method
    if (req.method === "POST") {
        try {
            const { user } = req.body;
            /**
             * used for validating the user object
             */
            console.log("1")
            if (!isValidStr(user.name)) {
                throw {
                    code: 400,
                    message: "Invalid Name"
                };
            }
            if (!STUDENT_EMAIL_REGEX.test(user.email)) {
                throw {
                    code: 400,
                    message: "Invalid Email"
                };
            }
            if (!PASSWORD_REGEX.test(user.password)) {
                throw {
                    code: 400,
                    message: "Invalid Password"
                };
            }
            console.log("2")
            const hashedPassword = await bcrypt.hash(user.password, 10);
            // make a student using the info we got from the front-end
            const newUser : User = {
                name: user.name,
                email: user.email,
                password: hashedPassword,
            };
            console.log("3")
            // send the student to the actionfunctions
            const response = await createUser(newUser);
            console.log("4")
            if (response.code !== 200) {
                throw {
                    code: response.code,
                    message: response.message
                };
            }
            // send a success code to front end + message if successful
            res.status(response.code).json(
                {
                    message: response.message
                }
            );
        } catch (error: any) {
            const { code = 500, message } = error;
            res.status(code).json(
                {
                    message
                }
            );
        }
    }
    else {
        res.status(405).json(
            {
                message: "Invalid Method"
            }
        );
    }
}