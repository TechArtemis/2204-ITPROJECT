// Third-party import
import { model, models, Schema, Types } from "mongoose";

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
        }
    }
);

export const Model = models.studentSchema || model("studentSchema", studentSchema);


