// Third-party import
import { model, models, Schema, Types } from "mongoose";
// Local import
import { JobPosting } from "@/interface/JobPosting";
import { JobApplication } from "@/interface/JobApplication";

const jobPostingSchema = new Schema (
    {
        company: String,
        jobDescription: String,
        jobTitle: {
            type: String,
            enum: JobPosting.JobTitleType,
            default: JobPosting.JobTitleType.FullTime
        },
        employmentType: {
            type: String,
            enum: JobPosting.Employment,
            default: JobPosting.Employment.OnSite
        },
        documentType: [String],
        datePosted: Date,
        approvalState: {
            type: String,
            enum: JobPosting.ProjectApproval,
            default: JobPosting.ProjectApproval.Pending
        },
        JobApplication: [] as JobApplication[]
    }
);

// makes the model for mongoose collections
export const Model = models.JobPostingSchema || model("jobPostingSchema", jobPostingSchema);