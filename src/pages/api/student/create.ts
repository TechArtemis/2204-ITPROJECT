// Third-party import
import { NextApiRequest, NextApiResponse } from "next";
// Local imports
import { EMAIL_REGEX, PASSWORD_REGEX, PHONE_REGEX, STUDENTID_REGEX } from "@/shared/regex";
import { Student } from "@/interface/Student";
import { createStudent } from "@/backend/actions/student";
import { isValidStr } from "@/shared/stringCheck";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            const { name, email, password, phoneNumber, studentID } : Student = req.body;
            if (isValidStr(name)) {
                throw {
                    code: 400,
                    message: "Invalid Name"
                };
            }
            if (!EMAIL_REGEX.test(email)) {
                throw {
                    code: 400,
                    message: "Invalid Email"
                };
            }
            if (!PASSWORD_REGEX.test(password)) {
                throw {
                    code: 400,
                    message: "Invalid Password"
                };
            }
            if (!PHONE_REGEX.test(phoneNumber)) {
                throw {
                    code: 400,
                    message: "Invalid Email"
                };
            }
            if (!STUDENTID_REGEX.test(studentID)) {
                throw {
                    code: 400,
                    message: "Invalid StudentID"
                };
            }
            const student : Student = {
                name: name,
                email: email,
                password: password,
                phoneNumber: phoneNumber,
                studentID: studentID
            };
            const response = await createStudent(student);
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
}