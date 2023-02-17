// Third-party import
import { NextApiRequest, NextApiResponse } from "next";
// Local import
import { getJobPosting } from "@/backend/actions/jobPosting";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            // Gets the id of the job posting in the url
            const { id } = req.query;
            // Stores the response if getting the job posting is successful
            const response = await getJobPosting(id as string);
            // Checks the response if not code 200 then throw a code and message
            if (response.code !== 200) {
                throw {
                    code: response.code,
                    message: "Invalid Job Posting"
                };
            }
            // Sends a response code and a message
            res.status(response.code).json(
                {
                    message: response.message
                }
            );
        // Catch an error and sends a error code and message
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
        // Sends a response of code 405 and a message
        res.status(405).json(
            {
                message: "Invalid Method"
            }
        );
    }
}