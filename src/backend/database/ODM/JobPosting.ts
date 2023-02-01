// Third-party import
import { model, models, Schema, Types } from "mongoose";
// Local import
import { JobPosting } from "@/interface/JobPosting";
import { Location } from "@/interface/Location";

const jobPostingSchema = new Schema (
    {
        companyName: {
            type: String,
            required: true
        },
        companyContact: {
            type: String,
            required: true
        },
        companyLocation: {
            type: Location,
            required: true
        },
        companyAbout: {
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
        requiredDocuments: {
            type: [] as String[],
            required: true
        },
        optionalDocuments: [] as String[],
        datePosted: {
            type: Date,
            default: Date.now()
        },
        approvalState: {
            type: String,
            enum: JobPosting.ProjectApproval,
            default: JobPosting.ProjectApproval.Pending,
            required: true
        }
    }
);


// makes the model for mongoose collections
export const Model = models.JobPostingSchema || model("jobPostingSchema", jobPostingSchema);