import Database from "@/backend/database";
import { Model as projectModel } from "@/backend/database/ODM/Project";
import { Project } from "@/interface/Project";

export async function createProject(project: Project) {
	try {
		await Database.setup(process.env.MONGODB_URI);
		const newProject = new projectModel(
			{
				name: project.name,
				image: project.image,
				hyperlink: project.hyperlink,
				description: project.description
			}
		);
		await newProject.save();


		return { code: 200, message: "SUCCESS" };
	} catch(error: any) {
		return { code: 500, message: "Project not created" };
	}
}

export async function getProject(_id: string) {
	try {
		await Database.setup(process.env.MONGODB_URI);
		const project = await projectModel.findById(_id);
		if(!project) {
			return { code: 400, message: "Project not found" };
		}

		return { code: 200, message: project };
	} catch(error:any) {
		return { code: 500, message: error.message };
	}
}

export async function getAllProject() {
	try {
		await Database.setup(process.env.MONGODB_URI);
		const projects = await projectModel.find();
		if(projects.length <= 0) {
			return { code: 400, message: "There are no projects found" };
		}

		return { code: 200, message: projects };

	} catch(error: any) {
		return { code: 500, message: error.message };
	}
}

export async function updateProject(_id: string, project: Project) {
	try {
		await Database.setup(process.env.MONGODB_URI);
		const currentProject = await projectModel.findOneAndUpdate({ _id },
			{
				name: project.name,
				image: project.image,
				hyperlink: project.hyperlink,
				description: project.description
			},
			{ new: true }
		);

		return { code: 200, message: "Project Updated!" };
	} catch(error: any) {
		return { code: 500, message: error.message };
	}
}

export async function deleteProject(_id: string) {
	try {
		await Database.setup(process.env.MONGODB_URI);
		const project = await projectModel.findById(_id);
		if(!project) {
			return { code: 400, message: "Project not found" };
		}
		await projectModel.findOneAndDelete({ _id });

		return { code: 200, message: "Successfully deleted a project" };
	} catch(error: any) {
		return { code: 500, message: error.message };
	}
}