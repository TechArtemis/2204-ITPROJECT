// Third-party import
import { Types } from "mongoose";

//local import
import { Location } from "@/interface/Location";

/**
 * @param {string} _id - id of Job Posting
 * @param {string} companyImage - image of company
 * @param {string} companyName - name of company
 * @param {string} companyContact - contact of company
 * @param {string} companyLocation - location of company
 * @param {string} companyAbout - about of company
 * @param {string} jobDescription - description of job
 * @param {string} jobType - type of job
 * @param {string} jobTitle - title of job
 * @param {string} employment - employment type
 * @param {string} datePosted - date posted
 *
 */
export interface JobPosting {
    _id?: Types.ObjectId | string
    companyName: string
    companyImage: string
    companyContact: string
	companyLink: string
    companyLocation: [{
        location: Location
    }];
    companyAbout: string
    jobDescription: string
    jobType: JobPosting.JobTitleType
    jobTitle: string
    employment: JobPosting.EmploymentType
    datePosted: Date
    tags: string[]
}

//namespace for JobPosting
export namespace JobPosting {

    // Enum for Job Title Type
    export enum JobTitleType {
        PartTime = "Part-Time",
        FullTime = "Full-Time",
        Contracted = "Contracted",
        Seasonal = "Seasonal",

        // Coop= "Co-op"
    }

    // Enum for Employement Type
    export enum EmploymentType {
        Remote = "Remote",
        Hybrid = "Hybrid",
        OnSite = "On Site"
    }
}

