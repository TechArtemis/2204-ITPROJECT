// Third-party import
import { Types } from "mongoose";

export interface Student {
    _id?: Types.ObjectId
    name: string
    email: string
    password: string
    phoneNumber: string
    studentID: string
}