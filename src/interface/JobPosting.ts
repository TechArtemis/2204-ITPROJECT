// Third-party import
import { Types } from "mongoose";
// Local import
import { Company } from "@/interface/Company";

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
    Company: Company
    JobDescription: string
    JobTitle: JobPosting.JobTitleType
    EmploymentType: JobPosting.Employment
    Document: string
    DatePosted: Date
    ApprovalState: JobPosting.ProjectApproval
}