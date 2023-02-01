// Local Import
import Database from "@/backend/database";
import { Student } from "@/interface/Student";
import { Model as studentModel } from "@/backend/database/ODM/Student";

// Third-party Import
import { Types } from "mongoose";

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

export async function getStudent(_id: String | Types.ObjectId) {
    try {
        await Database.setup(process.env.MONGODB_URI);
        const getStudent = await studentModel.findOne({ _id: _id });
        return { code: 200, message: getStudent };
    } catch (error: any) {
        return { code: 500, message: error.message };
    }
}

export async function updateStudent(email: String | Types.ObjectId, student: Student) {
    try {
        await Database.setup(process.env.MONGODB_URI);
        const updateStudent = await studentModel.findOneAndUpdate({ email },
            {
                name: student.name,
                email: student.email,
                phoneNumber: student.phoneNumber
            },
            { new: true });
        return { code: 200, message: updateStudent };
    } catch (error: any) {
        return { code: 500, message: error.message };
    }
}

export async function updatePasswordByEmail(email: String, password: String) {
    try {
        await Database.setup(process.env.MONGODB_URI);
        const student = await studentModel.findByIdAndUpdate({ email }, { password }, { new: true });
        return { code: 200, message: "Success" };
    } catch (error: any) {
        return { code: 500, message: error.message };
    }
}