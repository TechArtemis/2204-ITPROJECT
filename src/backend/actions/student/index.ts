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
                email: student.email,
                phoneNumber: student.phoneNumber,
                studentID: student.studentID,
                jobApplication: student.jobApplication
            }
        );

        await newStudent.save();
        return { code: 200, message: "Student created" };

    } catch (error: any) {
        return { code: 500, message: error.message };

    }
}

export async function getStudent(_id: String | Types.ObjectId) {
    await Database.setup(process.env.MONGODB_URI);
    const getStudent = await studentModel.findOne({ _id: _id });
    return getStudent;
}

export async function updateStudent(_id: String | Types.ObjectId, student: Student) {
    await Database.setup(process.env.MONGODB_URI);
    const updateStudent = await studentModel.findOneAndUpdate({ _id },
        {
            name: student.name,
            email: student.email,
            phoneNumber: student.phoneNumber
        },
        { new: true });
    return updateStudent;
}