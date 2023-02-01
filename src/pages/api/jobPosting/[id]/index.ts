// Third-party import
import { NextApiRequest, NextApiResponse } from "next";
// Local import
import { getJobPosting } from "@/backend/actions/jobPosting";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const { id } = req.query;

            const response = await getJobPosting(id as string);

            if (response.code !== 200) {
                throw {
                    code: response.code,
                    message: "Invalid Job Posting"
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