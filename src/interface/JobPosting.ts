// Third-party import
import { Types } from "mongoose";
import { Location } from "@/interface/Location";

/**
 * Enums for Job Posting
 */
export namespace JobPosting {
    // Enum for Job Title Type
    export enum JobTitleType {
        PartTime,
        FullTime,
        Contracted,
        Seasonal
    }
    // Enum for Employement Type
    export enum EmploymentType {
        Remote,
        Hybrid,
        OnSite
    }
}

/**
 * Interface for Job Posting
 */
export interface JobPosting {
    _id?: Types.ObjectId
    companyName: string
    companyContact: string
    companyLocation: Location
    companyAbout: string
    jobDescription: string
    jobTitle: JobPosting.JobTitleType
    employment: JobPosting.EmploymentType
    datePosted: Date
}