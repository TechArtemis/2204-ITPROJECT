import { model, models, Schema } from "mongoose";

const projectSchema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		image: {
			type: String,
			required: true
		},
		hyperlink: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		}
	}
);

export const Model = models.ProjectSchema || model("ProjectSchema", projectSchema);