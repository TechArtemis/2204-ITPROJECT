// Third-party import
import { model, models, Schema, Types } from "mongoose";

// Local import
import { JobPosting } from "@/interface/JobPosting";
import { Location } from "@/interface/Location";

/**
 * Schema for JobPosting
 */
const jobPostingSchema = new Schema (
    {
        companyName: {
            type: String,
            required: true
        },
        companyImage: {
            type: String,
            required: true,
        },
        companyContact: {
            type: String,
            required: true
        },
        companyLocation: {
            type: [] as Location[],
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
            required: true
        },
        jobType: {
            type: String,
            enum: JobPosting.JobTitleType,
            default: JobPosting.JobTitleType.FullTime,
            required: true
        },
        employment: {
            type: String,
            enum: JobPosting.EmploymentType,
            default: JobPosting.EmploymentType.OnSite,
            required: true
        },
        datePosted: {
            type: Date,
            default: Date.now()
        },
        tags: {
            type: [String],
            default: [],
            required: true
        }
    }
);

// makes the model for mongoose collections
export const Model = models.JobPostingSchema || model("JobPostingSchema", jobPostingSchema);