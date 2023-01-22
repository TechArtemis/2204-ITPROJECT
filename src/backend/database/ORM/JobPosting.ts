// Third-party import
import { model, models, Schema, Types } from "mongoose";
// Local import
import { JobPosting } from "@/interface/JobPosting";

const jobPostingSchema = new Schema (
    {
        Company: String || Types.ObjectId,
        JobDescription: String,
        JobTitle: {
            type: String,
            enum: JobPosting.JobTitleType,
            default: JobPosting.JobTitleType.FullTime
        },
        EmploymentType: {
            type: String,
            enum: JobPosting.Employment,
            default: JobPosting.Employment.OnSite
        },
        Document: String,
        DatePosted: Date,
        ApprovalState: {
            type: String,
            enum: JobPosting.ProjectApproval,
            default: JobPosting.ProjectApproval.Pending
        }
    }
);

// makes the model for mongoose collections
export  const Model = models.JobPostingSchema || model("jobPostingSchema", jobPostingSchema)