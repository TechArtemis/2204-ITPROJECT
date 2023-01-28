// Third-party import
import { model, models, Schema, Types } from "mongoose";
// Local import
import { JobPosting } from "@/interface/JobPosting";
import { JobApplication } from "@/interface/JobApplication";

const jobPostingSchema = new Schema (
    {
        company: {
            type: String,
            required: true
        },
        jobEmail: {
            type: String,
            required: true
        },
        jobDescription: {
            type: String,
            required: true
        },
        jobTitle: {
            type: String,
            enum: JobPosting.JobTitleType,
            default: JobPosting.JobTitleType.FullTime,
            required: true
        },
        employmentType: {
            type: String,
            enum: JobPosting.Employment,
            default: JobPosting.Employment.OnSite,
            required: true
        },
        documentType: [] as String[],
        datePosted: {
            type: Date,
            default: Date.now()
        },
        approvalState: {
            type: String,
            enum: JobPosting.ProjectApproval,
            default: JobPosting.ProjectApproval.Pending,
            required: true
        },
        jobApplication: [] as JobApplication[]
    }
);


// makes the model for mongoose collections
export const Model = models.JobPostingSchema || model("jobPostingSchema", jobPostingSchema);