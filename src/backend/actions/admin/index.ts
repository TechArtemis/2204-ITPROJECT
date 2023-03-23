// Local import
import Database from "@/backend/database";
import { Model as adminModel } from "@/backend/database/ODM/Admin";
import { Admin } from "@/interface/Admin";
import { Model } from "mongoose";

/**
 * createAdmin function for creating an admin account in the database
 * @param admin the admin account that the database is going to store
 * @returns a code and a message
 */
export async function createAdmin(admin: Admin) {
    try {
        await Database.setup(process.env.MONGODB_URI);
        const adminArr: Admin[] = await adminModel.find({});
        if (adminArr.length > 0) {
            return { code: 400, message: "Admin already exists" };
        }
        const newAdmin = new adminModel(
            {
                email: admin.email,
                password: admin.password,
                name: admin.name
            }
        );
        await newAdmin.save();


        return { code: 200, message: "Successful" };
    } catch (error: any) {
        return { code: 500, message: error.message };
    }
}

/**
 * A function that gets the admin from the database
 * @param email the email of the admin account
 * @returns a code and a message
 */
export async function getAdmin(email: string) {
    try {
        await Database.setup(process.env.MONGODB_URI);
        const getAdmin: Admin | null = await adminModel.findOne({ email });
        if (!getAdmin) {
            return { code: 400, message: "Admin doesnt exist" };
        }


        return { code: 200, message: getAdmin };
    } catch (error: any) {
        return { code: 500, message: error.message };
    }
}

/**
 * A function that changes the password of the admin account
 * @param password the new password of the admin account
 * @param email the email of the admin account
 * @returns a code and a message
 */
export async function changePassword(password: string, email: string) {
    try {
        await Database.setup(process.env.MONGODB_URI);
        const getAdmin = await adminModel.findOneAndUpdate({ email }, { password }, { new: true });


        return { code: 200, message: "Password changed" };
    } catch (error: any) {
        return { code: 500, message: error.message };
    }
}