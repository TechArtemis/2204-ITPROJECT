// Third-party import
import { Types } from "mongoose";
import { JobPosting } from "@/interface/JobPosting";

/**
 * Interface for Student
 */
export interface Student {
    _id?: Types.ObjectId
    name: string
    email: string
    password: string
    phoneNumber: string
    studentID: string,
    favorites: Favorite[]
}

export interface Favorite {
    jobPosting: JobPosting["_id"];
}