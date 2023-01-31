// Third-party import
import { Types } from "mongoose";
import { Location } from "@/interface/Location";

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
    companyName: string
    companyContact: string
    companyLocation: Location
    companyAbout: string
    jobDescription: string
    jobTitle: JobPosting.JobTitleType
    employmentType: JobPosting.Employment
    requiredDocuments: [string],
    optionalDocuments: [string],
    datePosted: Date
    approvalState: JobPosting.ProjectApproval
}