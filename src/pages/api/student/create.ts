// Third-party import
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
// Local imports
import { EMAIL_REGEX, PASSWORD_REGEX, PHONE_REGEX, STUDENTID_REGEX } from "@/shared/regex";
import { Student } from "@/interface/Student";
import { createStudent } from "@/backend/actions/student";
import { isValidStr } from "@/shared/stringCheck";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // post method
    if (req.method === "POST") {
        try {
            const { student } = req.body;
            /**
             * used for validating the student object
             */
            if (!isValidStr(student.name)) {
                throw {
                    code: 400,
                    message: "Invalid Name"
                };
            }
            if (!EMAIL_REGEX.test(student.email)) {
                throw {
                    code: 400,
                    message: "Invalid Email"
                };
            }
            if (!PASSWORD_REGEX.test(student.password)) {
                throw {
                    code: 400,
                    message: "Invalid Password"
                };
            }
            if (!PHONE_REGEX.test(student.phoneNumber)) {
                throw {
                    code: 400,
                    message: "Invalid Email"
                };
            }
            if (!STUDENTID_REGEX.test(student.studentID)) {
                throw {
                    code: 400,
                    message: "Invalid StudentID"
                };
            }
            const hashedPassword = await bcrypt.hash(student.password, 10);
            // make a student using the info we got from the front-end
            const newStudent : Student = {
                name: student.name,
                email: student.email,
                password: hashedPassword,
                phoneNumber: student.phoneNumber,
                studentID: student.studentID
            };
            // send the student to the actionfunctions
            const response = await createStudent(newStudent);
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