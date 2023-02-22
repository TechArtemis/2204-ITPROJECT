import Database from "@/backend/database";
import { User } from "@/interface/User";
import { Model as userModel } from "@/backend/database/ODM/User";
import bcrypt from "bcrypt";

export async function createUser(user: User) {
    try {
        await Database.setup(process.env.MONGODB_URI);
        const existingUser = await userModel.findOne({ email: user.email });
        if (existingUser) {
            return { code: 400, message: "Alumni already exists" };
        }
        const newUser = new userModel (
            {
                name: user.name,
                email: user.email,
                password: user.password,
            }
        );
        await newUser.save();
        return { code: 200, message: "User created" };
    } catch(error: any) {
        return { code: 500, message: error.message };
    }
}

export async function updateUser(user: User, currentPassword: string, newPassword: string) {
    try {
        await Database.setup(process.env.MONGODB_URI);
        const existingUser = await userModel.findOne({ email: user.email });
        if(!existingUser) {
            return { code: 400, message: "Invalid" };
        }
        const isValid = await bcrypt.compare(existingUser.password, currentPassword);
        if(!isValid) {
            return { code: 400, message: "Invalid" };
        }
        const hashed = await bcrypt.hash(newPassword, 10);
        existingUser.password = hashed;
        existingUser.save();
        return { code: 200, message: "SUCCESS" };
    } catch(error: any) {
        return { code: 500, message: error.message };
    }
}

export async function updateUser2(user: User, currentPassword: string, newPassword: string) {
    try {
        await Database.setup(process.env.MONGODB_URI);
        const verifyPassword = await userModel.findOne({ email: user.email });
        const isValid = await bcrypt.compare(verifyPassword.password, currentPassword);
        if(!isValid) {
            return { code: 400, message: "Invalid" };
        }
        await userModel.findOneAndUpdate({ email: user.email }, { password: newPassword }, { new: true });
        return { code: 200, message: "Success" };
    } catch (error: any) {
        return { code: 500, message: error.message };
    }
}

export async function deleteUser(user: User, currentPassword: string) {
    try {
        await Database.setup(process.env.MONGODB_URI);
        const existingUser = await userModel.findOne({ email: user.email });
        if(!existingUser) {
            return { code: 400, message: "Invalid" };
        }
        const isValid = await bcrypt.compare(existingUser.password, currentPassword);
        if(!isValid) {
            return { code: 400, message: "Invalid" };
        }
        await userModel.findOneAndDelete({ email: existingUser.email });
        return { code: 400, message: "SUCCESS" };
    } catch(error: any) {
        return { code: 500, message: error.message };
    }
}

export async function getUser(email: String) {
    try {
        await Database.setup(process.env.MONGODB_URI);
        const getUser = await userModel.findOne({ email });
        if (!getUser) {
            return { code: 400, message: "Not logged in" };
        }
        return { code: 200, message: getUser };
    } catch (error: any) {
        return { code: 500, message: error.message };
    }
}