// Third-party import
import { Types } from "mongoose";

export interface Admin {
    _id: Types.ObjectId,
    Email: string,
    Password: string,
    Name: "Admin"
}