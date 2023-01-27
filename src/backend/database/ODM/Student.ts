// Third-party import
import { model, models, Schema, Types } from "mongoose";

// Local Import
import { JobApplication } from "@/interface/JobApplication";

const studentSchema = new Schema(
    {
        id: String || Types.ObjectId,
        name: {
            type: String,
            required: true
        },
        email:{
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
        jobApplication: {
            type: [] as JobApplication[]
        }
    }
);

export const Model = models.studentSchema || model("studentSchema", studentSchema);


