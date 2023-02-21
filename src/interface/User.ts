// Third-party import
import { Types } from "mongoose";

/**
 * Interface for Student
 */
export interface User {
    _id?: Types.ObjectId
    name: string
    email: string
    password?: string
}