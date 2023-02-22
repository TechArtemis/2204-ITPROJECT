// Third-party import
import { Types } from "mongoose";
// Local import
import { JobPosting } from "@/interface/JobPosting";

/**
 * Interface for Student
 */
export interface User {
    _id?: Types.ObjectId
    name: string
    email: string
    password?: string
    favorites: Favorite[]   
}
export interface Favorite {
    jobPosting: JobPosting["_id"];
}