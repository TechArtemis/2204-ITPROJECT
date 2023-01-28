// Third-party import
import { Types } from "mongoose";
import { JobApplication } from "@/interface/JobApplication";

export namespace JobPosting {
    export enum JobTitleType {
        PartTime,
        FullTime,
        Contracted,
        Seasonal
    }
    export enum Employment {
        Remote,
        Hybrid,
        OnSite
    }
    export enum ProjectApproval {
        Rejected,
        Pending,
        Approved
    }
}

export interface JobPosting {
    _id?: Types.ObjectId
    company: string
    jobEmail: string
    jobDescription: string
    jobTitle: JobPosting.JobTitleType
    employmentType: JobPosting.Employment
    documentType: [string]
    datePosted: Date
    approvalState: JobPosting.ProjectApproval
    jobApplication: [JobApplication] // an array of jobapplication for admin, they can use this to view who applied for the jobs
}