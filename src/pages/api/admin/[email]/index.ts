import { getAdmin } from "@/backend/actions/admin";
import { EMAIL_REGEX } from "@/shared/regex";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const { email } = req.query;
            // validation
            if (!EMAIL_REGEX.test(email as string)) {
                throw {
                    code: 400,
                    message: "Invalid Email"
                };
            }
            // gets the admin account
            const response = await getAdmin(email as string);
            if (response.code !== 200) {
                throw {
                    code: response.code,
                    message: response.message
                };
            }
            // sends the response to front end
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
    else if (req.method === "PUT") {
        const session = await getServerSession(req, res, authOptions);

        if(!session) {
            res.status(500).json(
                {
                    message: "Not logged in"
                }
            );
        }
        try {

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