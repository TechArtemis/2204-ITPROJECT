// Third-party import
import { Types } from "mongoose";

// Local import
import { JobPosting } from "@/interface/JobPosting";

/**
 * @param {string} _id - id of user
 * @param {string} name - name of user
 * @param {string} email - email of user
 * @param {string} password - password of user
 * @param {string} favorites - favorites of user
 *
 */
export interface User {
    _id?: Types.ObjectId | string
    name: string
    email: string
    password?: string
    favorites?: Favorite[]
}

/**
 * @param {string} jobPosting - job posting id
 */
export interface Favorite {
    jobPosting: JobPosting["_id"];
}