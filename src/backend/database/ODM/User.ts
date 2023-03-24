// Third-party import
import { model, models, Schema, Types } from "mongoose";

/**
 * Schema for User
 */
const userSchema = new Schema(
	{
		id: String || Types.ObjectId,
		name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		},
		favorites: {
			type: [{ type: Schema.Types.ObjectId, ref: "JobPostingSchema" }],
			default: [],
		}
	}
);

export const Model = models.UserSchema || model("UserSchema", userSchema);
