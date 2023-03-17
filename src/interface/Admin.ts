// Third-party import
import { Types } from "mongoose";

/**
 * @param {string} _id - id of Admin
 * @param {string} email - email of Admin
 * @param {string} password - password of Admin
 * @param {string} name - static value "Admin"
 */
export interface Admin {
    _id?: Types.ObjectId,
    email: string,
    password: string,
    name: "Admin"
}