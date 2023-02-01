// Third-party import
import { NextApiRequest, NextApiResponse } from "next";
// Local import
import { Admin } from "@/interface/Admin";
import { EMAIL_REGEX, PASSWORD_REGEX } from "@/shared/regex";
import { createAdmin, getAdmin } from "@/backend/actions/admin";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            const { admin } = req.body;
            if (!EMAIL_REGEX.test(admin.email)) {
                throw {
                    code: 400,
                    message: "Invalid Email"
                };
            }
            if (!PASSWORD_REGEX.test(admin.password)) {
                throw {
                    code: 400,
                    message: "Invalid Password"
                };
            }
            const newAdmin : Admin = {
                email: admin.email,
                password: admin.password,
                name: "Admin"
            };
            const response = await createAdmin(newAdmin);
            if (response.code !== 200) {
                throw {
                    code: 400,
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
    else if (req.method === "GET") {
        try {
            const { email } = req.query;
            if (!EMAIL_REGEX.test(email as string)) {
                throw {
                    code: 400,
                    message: "Invalid Email"
                };
            }
            const response = await getAdmin(email as string);
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