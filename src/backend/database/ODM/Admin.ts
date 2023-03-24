// Third-party imports
import { model, models, Schema } from "mongoose";

/**
 * Schema for Admin
 */
const adminSchema = new Schema(
	{
		email: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		},
		name: {
			type: String,
			required: true
		},
		favorites: {
			type: [{ type: Schema.Types.ObjectId, ref: "JobPostingSchema" }],
			default: [],
		}
	}
);

// makes the model for mongoose collections
export const Model = models.AdminSchema || model("AdminSchema", adminSchema);