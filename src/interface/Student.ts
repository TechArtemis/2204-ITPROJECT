// Third-party import
import { Types } from "mongoose";
// Local import
import { JobApplication } from "@/interface/JobApplication";

export interface Student {
    _id: Types.ObjectId
    name: string
    email: string
    phoneNumber: string
    studentID: string
    jobApplication: [JobApplication]
}