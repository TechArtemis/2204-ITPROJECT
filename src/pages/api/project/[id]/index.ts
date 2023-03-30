// Third-Party Imports
import { NextApiRequest, NextApiResponse } from "next";

// Local Imports
import { deleteProject } from "@/backend/actions/project";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "DELETE") {
		try {
			const { id } = req.query;
			if (!id) {
				throw {
					code: 400,
					message: "Missing _id"
				};
			}
			const response = await deleteProject(id as string);
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
		} catch(error: any) {
			const { code = 400, message = error.message } = error;
			res.status(code).json(
				{
					message: message
				}
			);
		}
	} else {
		res.status(500).json(
			{
				message: "INVALID METHOD"
			}
		);
	}
}