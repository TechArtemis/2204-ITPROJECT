// Local import
import Database from "@/backend/database";
import { Model as adminModel } from "@/backend/database/ODM/Admin";
import { Admin } from "@/interface/Admin";

export async function createAdmin(admin: Admin) {
    try {
        await Database.setup(process.env.MONGODB_URI);

        const adminArr = await adminModel.find({});

        if (adminArr.length > 0) {
            return { code: 400, message: "Admin already exists" };
        }

        const newAdmin = new adminModel(
            {
                email: admin.Email,
                password: admin.Password,
                name: admin.Name
            }
        );

        await newAdmin.save();

        return { code: 200, message: "Successful" };

    } catch (error: any) {
        return { code: 500, message: error.message };
    }
}

export async function changePassword(password: string, email: string) {
    try {
        await Database.setup(process.env.MONGODB_URI);

        const getAdmin = await adminModel.findOneAndUpdate({ email }, { password }, { new: true });

        return { code: 200, message: "Password changed" };
    } catch (error: any) {
        return { code: 500, message: error.message };
    }
}