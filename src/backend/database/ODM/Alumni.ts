// Third-party import
import { model, models, Schema, Types } from "mongoose";

/**
 * Schema for Student
 */
const alumniSchema = new Schema(
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
        }
    }
);

export const Model = models.alumniSchema || model("alumniSchema", alumniSchema);