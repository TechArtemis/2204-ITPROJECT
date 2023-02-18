// Third-party import
import { model, models, Schema, Types } from "mongoose";

/**
 * Schema for Student
 */
const studentSchema = new Schema(
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
        phoneNumber: {
            type: String,
            required: true
        },
        studentID: {
            type: String,
            required: true
        },
        favorites: {
            type: Schema.Types.ObjectId,
            default: [],
            ref: "JobPosting"
        }
    }
);

export const Model = models.StudentSchema || model("StudentSchema", studentSchema);