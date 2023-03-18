// Third-party imports
import { model, models, Schema, Types } from "mongoose";

/**
 * Schema for Admin
 */
const adminSchema = new Schema(
    {
        id: String || Types.ObjectId,
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        name: String
    }
);

// makes the model for mongoose collections
export const Model = models.AdminSchema || model("AdminSchema", adminSchema);