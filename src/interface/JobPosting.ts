// Third-party import
import { Types } from "mongoose";
import { Location } from "@/interface/Location";

/**
 * Interface for Job Posting
 */
export interface JobPosting {
    _id?: Types.ObjectId | string;
    companyImage: string;
    companyName: string;
    companyContact: string;
    companyLocation: [{
        location: Location;
    }];
    companyAbout: string;
    jobDescription: string;
    jobType: JobPosting.JobTitleType;
    jobTitle: string;
    employment: JobPosting.EmploymentType;
    datePosted: Date;
}

/**
 * Enums for Job Posting
 */
export namespace JobPosting {
    // Enum for Job Title Type
    export enum JobTitleType {
        PartTime = "PartTime",
        FullTime = "FullTime",
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

