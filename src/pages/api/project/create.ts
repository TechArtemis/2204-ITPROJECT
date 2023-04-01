import { NextApiRequest, NextApiResponse } from "next";
import { createProject } from "@/backend/actions/project";
import { isValidStr } from "@/shared/stringCheck";
import { Project } from "@/interface/Project";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		try {
			const { project } = req.body;
			if (!isValidStr(project.name)) {
				throw {
					code: 400,
					message: "Invalid Project Name"
				};
			}
			if (!isValidStr(project.image)) {
				throw {
					code: 400,
					message: "Invalid Project Image"
				};
			}
			if (!isValidStr(project.hyperlink)) {
				throw {
					code: 400,
					message: "Invalid Project Hyperlink"
				};
			}
			if (!isValidStr(project.description)) {
				throw {
					code: 400,
					message: "Invalid Project Description"
				};
			}
			const newProject: Project = {
				name: project.name,
				image: project.image,
				hyperlink: project.hyperlink,
				description: project.description
			};
			const response = await createProject(newProject);
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
			const { code = 500, message = error.message } = error;
			res.status(code).json(
				{
					message: message
				}
			);
		}
	} else {
		res.status(405).json(
			{
				message: "Invalid Method"
			}
		);
	}
}