// Third-Party Imports
import { NextApiRequest, NextApiResponse } from "next";

// Local Imports
import { deleteProject, updateProject } from "@/backend/actions/project";
import { isValidStr } from "@/shared/stringCheck";
import { Project } from "@/interface/Project";

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
	} else if (req.method === "PUT") {
		try {
			const { id } = req.query;
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
			if (!id) {
				throw {
					code: 400,
					message: "Missing _id"
				};
			}
			const newProject: Project = {
				name: project.name,
				image: project.image,
				hyperlink: project.hyperlink,
				description: project.description
			};

			const response = await updateProject(id as string, newProject);
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