// Third-party Import
import { Types } from "mongoose";
// Local Import
import Database from "@/backend/database";
import { Student } from "@/interface/Student";
import { Model as studentModel } from "@/backend/database/ODM/Student";

/**
 * Creates a student account in the database
 * @param student the student object that is going to the database
 * @returns a code and message
 */
export async function createStudent(student: Student) {
    try {
        await Database.setup(process.env.MONGODB_URI);
        const existingStudent = await studentModel.findOne({ email: student.email });
        if (existingStudent) {
            return { code: 400, message: "Student already exists" };
        }
        const newStudent = new studentModel (
            {
                name: student.name,
                email: student.email,
                password: student.password,
                phoneNumber: student.phoneNumber,
                studentID: student.studentID
            }
        );
        await newStudent.save();
        return { code: 200, message: "Student created" };
    } catch (error: any) {
        return { code: 500, message: error.message };
    }
}

/**
 * A function that gets a student base on its email
 * @param email the email of the student that you want to get
 * @returns a code and a message
 */
export async function getStudent(email: String) {
    try {
        await Database.setup(process.env.MONGODB_URI);
        const getStudent = await studentModel.findOne({ email });
        if (!getStudent) {
            return { code: 400, message: "Not logged in" };
        }
        return { code: 200, message: getStudent };
    } catch (error: any) {
        return { code: 500, message: error.message };
    }
}

/**
 * Updates the student account's name and phone number
 * @param email used to identify the account
 * @param student account that has the new details
 * @returns the updated student account and updates the front end
 */
export async function updateStudent(email: String | Types.ObjectId, student: Student) {
    try {
        await Database.setup(process.env.MONGODB_URI);
        const updateStudent = await studentModel.findOneAndUpdate({ email },
            {
                name: student.name,
                phoneNumber: student.phoneNumber
            },
            { new: true });
        return { code: 200, message: updateStudent };
    } catch (error: any) {
        return { code: 500, message: error.message };
    }
}

/**
 * A function that updates the students password
 * @param email the email of the student you want to change password
 * @param password the new password for the student
 * @returns a code and a message
 */
export async function updatePasswordByEmail(email: String, password: String) {
    try {
        await Database.setup(process.env.MONGODB_URI);
        const student = await studentModel.findByIdAndUpdate({ email }, { password }, { new: true });
        return { code: 200, message: "Success" };
    } catch (error: any) {
        return { code: 500, message: error.message };
    }
}