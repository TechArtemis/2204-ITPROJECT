// Third-party import
import { model, models, Schema, Types } from "mongoose";
// Local import
import { JobApplication } from "@/interface/JobApplication";

const jobApplicationSchema = new Schema(
    {
        id: String || Types.ObjectId,
        jobPosting: Types.ObjectId,
        student: Types.ObjectId,
        documents: [String]
    }
);

// makes the model for mongoose collections
export const Model = models.jobApplicationSchema || model("jobApplicationSchema", jobApplicationSchema);