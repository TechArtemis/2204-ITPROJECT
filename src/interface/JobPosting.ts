// Third-party import
import { Types } from "mongoose";
import { Location } from "@/interface/Location";

/**
 * Interface for Job Posting
 */
export interface JobPosting {
    _id?: Types.ObjectId,
    image: string,
    companyName: string
    companyContact: string
    companyLocation: Location
    companyAbout: string
    jobDescription: string
    jobType: JobPosting.JobTitleType
    jobTitle: string
    employment: JobPosting.EmploymentType
    datePosted: Date
}

/**
 * Enums for Job Posting
 */
export namespace JobPosting {
    // Enum for Job Title Type
    export enum JobTitleType {
        PartTime = "Part-time",
        FullTime = "Full-time",
        Contracted = "Contracted",
        Seasonal = "Seasonal"
    }
    // Enum for Employement Type
    export enum EmploymentType {
        Remote = "Remote",
        Hybrid = "Hybrid",
        OnSite = "OnSite"
    }
}

