// Third-party imports
import { model, models, Schema, Types } from "mongoose";

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
        name: "Admin"
    }
);

// makes the model for mongoose collections
export const Model = models.AdminSchema || model("AdminSchema", adminSchema);