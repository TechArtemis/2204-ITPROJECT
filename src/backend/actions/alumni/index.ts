import Database from "@/backend/database";
import { Alumni } from "@/interface/Alumni";
import { Model as alumniModel } from "@/backend/database/ODM/Alumni";

export async function createAlumni(alumni: Alumni) {
    try {
        await Database.setup(process.env.MONGODB_URI);
        const existingAlumni = await alumniModel.findOne({ email: alumni.email });
        if (existingAlumni) {
            return { code: 400, message: "Alumni already exists" };
        }
        const newAlumni = new alumniModel (
            {
                name: alumni.name,
                email: alumni.email,
                password: alumni.password,
            }
        );
        await newAlumni.save();
        return { code: 200, message: "Alumni created" };
    } catch (error: any) {
        return { code: 500, message: error.message };
    }
}