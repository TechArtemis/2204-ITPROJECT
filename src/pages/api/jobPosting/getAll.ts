// Third-party imports
import { NextApiRequest, NextApiResponse } from "next";

// Local imports
import { getAllPosting } from "@/backend/actions/jobPosting";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {

            // Gets all the jobposting and stores the response
            const response = await getAllPosting();

            // Sends a response code and a message
            res.status(response.code).json(
                {
                    message: response.message
                }
            );

            // Catch the error and sends a code and a message
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

        // Sends a response code 405 and a message
        res.status(405).json(
            {
                message: "Invalid Method"
            }
        );
    }
}