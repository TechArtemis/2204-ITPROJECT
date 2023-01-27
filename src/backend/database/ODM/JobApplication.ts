// Third-party import
import { model, models, Schema, Types } from "mongoose";

const jobApplicationSchema = new Schema(
    {
        id: String || Types.ObjectId,
        jobPosting: {
            type: Types.ObjectId,
            required: true
        },
        student: {
            type: Types.ObjectId,
            required: true
        },
        documents: [] as String[]
    }
);

// makes the model for mongoose collections
export const Model = models.jobApplicationSchema || model("jobApplicationSchema", jobApplicationSchema);