// Third-party import
import { NextApiRequest, NextApiResponse } from "next";
// Local import
import { getAllPosting } from "@/backend/actions/jobPosting";

export default async function hanlder(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "GET") {
        try {

            const response = await getAllPosting();

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