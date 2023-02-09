import { Alumni } from "@/interface/Alumni";
import { EMAIL_REGEX, PASSWORD_REGEX, PHONE_REGEX, STUDENTID_REGEX } from "@/shared/regex";
import { isValidStr } from "@/shared/stringCheck";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { createAlumni } from "@/backend/actions/alumni";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // post method
    if (req.method === "POST") {
        try {
            const { alumni } = req.body;
            /**
             * used for validating the student object
             */
            if (!isValidStr(alumni.name)) {
                throw {
                    code: 400,
                    message: "Invalid Name"
                };
            }
            if (!EMAIL_REGEX.test(alumni.email)) {
                throw {
                    code: 400,
                    message: "Invalid Email"
                };
            }
            if (!PASSWORD_REGEX.test(alumni.password)) {
                throw {
                    code: 400,
                    message: "Invalid Password"
                };
            }
            const hashedPassword = await bcrypt.hash(alumni.password, 10);
            // make a student using the info we got from the front-end
            const newAlumni : Alumni = {
                name: alumni.name,
                email: alumni.email,
                password: hashedPassword,
            };
            // send the student to the actionfunctions
            const response = await createAlumni(newAlumni);
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