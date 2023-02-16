import { getFavorites } from "@/backend/actions/student";
import { EMAIL_REGEX } from "@/shared/regex";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "GET") {
        try {
            const { email } = req.query;

            // validation
            if (!EMAIL_REGEX.test(email as string)) {
                throw {
                    code: 400,
                    message: "Invalid Email"
                };
            }

            const response = await getFavorites(email as string);
            if(response.code !== 200) {
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

        } catch (error:any) {
            const { code = 500, message } = error;
            res.status(500).json(
                {
                    message
                }
            );
        }
    }
    else if (req.method === "POST") {
        try {
            const { email } = req.query;
            // validation
            if (!EMAIL_REGEX.test(email as string)) {
                throw {
                    code: 400,
                    message: "Invalid Email"
                };
            }
        } catch (error:any) {
            const { code = 500, message } = error;
            res.status(500).json(
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