// Third-party import
import { Types } from "mongoose";

/**
 * Interface for Student
 */
export interface Alumni {
    _id?: Types.ObjectId
    name: string
    email: string
    password: string
}