import { updateJobPosting } from "@/backend/actions/jobPosting";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

	if (req.method === "PUT") {
		console.log("entered");
		try {

			const { id } = req.query;

			if (!id) {
				throw {
					code: 400,
					message: "Missing _id"
				};
			}


			console.log(req.body.jobPosting);
			const response = await updateJobPosting(id as string, req.body.jobPosting);



			if( response.code !== 200) {
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

	} else {
		res.status(405).json({ message: "Method Not Allowed" });
	}

}