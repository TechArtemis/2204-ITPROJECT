// Third-party Import
import { Types } from "mongoose";
// Local Import
import Database from "@/backend/database";
import { Student } from "@/interface/Student";
import { Model as studentModel } from "@/backend/database/ODM/Student";
import { Model as jobpostingModel } from "@/backend/database/ODM/JobPosting";

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
                studentID: student.studentID,
                favorites: []
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

/**
 * A function that add Job Posting to the favorites of the student
 * @param email the email of the student
 * @returns a code and a message
 */
export async function updateFavorites(email: string, jobId: string, action: string) {
    try {
        await Database.setup(process.env.MONGODB_URI);
        const student = await studentModel.findOne({ email });
        const jobposting = await jobpostingModel.findById(jobId);
        if(!student) {
            return { code: 400, message: "Your not registered" };
        }
        if(!jobposting) {
            return { code: 400, message: "Error updating favorites" };
        }

        if(action === "add") {
            student.favorites.unshift(jobposting);
        } else if(action === "remove") {
            student.favorites.pull(jobposting);
        } else {
            return { code: 400, message: "Action does not exist" };
        }
        await student.save();
    } catch (error: any) {
        return { code: 500, message: error.message };
    }
}

/**
 * A function that gets all favorites of the student
 * @param email the email of the student
 * @returns a code and a message
 */
export async function getFavorites(email: string) {
    try{
        await Database.setup(process.env.MONGODB_URI);
        const student = await studentModel.findById({ email }).populate("favorites");
        if(!student) {
            return { code: 400, message: "Student not found." };
        }
        return { code: 200, message: student.favorites };

    } catch (error: any) {
        return { code: 500, message: error.message };
    }
}