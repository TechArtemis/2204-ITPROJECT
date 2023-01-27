// Third-party import
import { Types } from "mongoose";

export interface JobApplication {
    _id?: Types.ObjectId
    jobPosting: Types.ObjectId // a reference to which job posting it is for, just in case its needed
    student: Types.ObjectId // a json object inside an object
    documents: [string]
}