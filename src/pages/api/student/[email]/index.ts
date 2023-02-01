// Third-party import
import { NextApiRequest, NextApiResponse } from "next";
// Local imports
import { getStudent, updatePasswordByEmail } from "@/backend/actions/student";
import { EMAIL_REGEX, PASSWORD_REGEX } from "@/shared/regex";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const { email } = req.query;

            if (!EMAIL_REGEX.test(email as string)) {
                throw {
                    code: 400,
                    message: "Invalid Email"
                };
            }

            const response = await getStudent(email as string);
            if (response.code !== 200) {
                throw {
                    code: response.code,
                    message: response.message
                };
            }
            res.status(200).json(
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
    else if (req.method === "PUT") {
        // Implement when nextauth is implemented
        // const session = await unstable_GetServerSession(resa, req, authOptions);

        // if (!session) {
        //     res.status(500).json(
        //         {
        //             message: "Not logged in"
        //         }
        //     );
        // }
        try {
            const { email } = req.query;
            const { password } = req.body;
            if (!EMAIL_REGEX.test(email as string)) {
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
            const response = await updatePasswordByEmail(email as string, password);
            if (response.code !== 200) {
                throw {
                    code: response.code,
                    message: response.message
                };
            }
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