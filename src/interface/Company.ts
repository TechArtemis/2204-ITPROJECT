// Third-party import
import { Types } from "mongoose";

export interface Company {
    _id?: Types.ObjectId
    Image: string
    CompanyName: string
    CompanyLocation: string
}