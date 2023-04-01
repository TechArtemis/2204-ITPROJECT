// Third-party import
import bcrypt from "bcrypt";

// Local import
import Database from "@/backend/database";
import { User } from "@/interface/User";
import { Model as userModel } from "@/backend/database/ODM/User";
import { Model as adminModel } from "@/backend/database/ODM/Admin";
import { Model as jobPostingModel } from "@/backend/database/ODM/JobPosting";

/**
 * Creates a student account in the database
 * @param student the student object that is going to the database
 * @returns a code and message
 */
export async function createUser(user: User) {
	try {
		await Database.setup(process.env.MONGODB_URI);
		const existingUser = await userModel.findOne({ email: user.email });
		if (existingUser) {
			return { code: 409, message: "User already exists" };
		}
		const newUser = new userModel(
			{
				name: user.name,
				email: user.email,
				password: user.password,
				favorites: []
			}
		);
		await newUser.save();


		return { code: 201, message: "User created" };
	} catch (error: any) {
		return { code: 500, message: error.message };
	}
}

/**
 * update the user's name
 * @param user the current user
 * @param currentPassword the user's current password
 * @param newName user's new name
 * @returns a success message if success, invalid if password doesn't match
 */
export async function updateName(user: User, currentPassword: string, newName: string) {
	try {
		await Database.setup(process.env.MONGODB_URI);
		const verifyPassword = await userModel.findOne({ email: user.email });
		const isValid = await bcrypt.compare(verifyPassword.password, currentPassword);
		if (!isValid) {
			return { code: 400, message: "Invalid Password" };
		}
		await userModel.findOneAndUpdate({ email: user.email }, { name: newName }, { new: true });


		return { code: 200, message: "Success" };
	} catch (error: any) {
		return { code: 500, message: error.message };
	}
}

/**
 * Updates the student account's name and phone number
 * @param email used to identify the account
 * @param currentPassword the user's current password
 * @param newPassword the user's new password
 * @returns the updated student account and updates the front end
 */
export async function updatePassword(email: string, currentPassword: string, newPassword: string) {
	try {
		await Database.setup(process.env.MONGODB_URI);
		const verifyPassword = await userModel.findOne({ email });
		const isValid = await bcrypt.compare(verifyPassword.password, currentPassword);
		if (!isValid) {
			return { code: 400, message: "Invalid Password" };
		}
		await userModel.findOneAndUpdate({ email }, { password: newPassword }, { new: true });


		return { code: 200, message: "Success" };
	} catch (error: any) {
		return { code: 500, message: error.message };
	}
}

export async function deleteUser(user: User, currentPassword: string) {
	try {
		await Database.setup(process.env.MONGODB_URI);
		const existingUser = await userModel.findOne({ email: user.email });
		if (!existingUser) {
			return { code: 400, message: "Invalid" };
		}
		const isValid = await bcrypt.compare(existingUser.password, currentPassword);
		if (!isValid) {
			return { code: 400, message: "Invalid" };
		}
		await userModel.findOneAndDelete({ email: existingUser.email });


		return { code: 400, message: "SUCCESS" };
	} catch (error: any) {
		return { code: 500, message: error.message };
	}
}

/**
 * A function that gets a student base on its email
 * @param email the email of the user that you want to get
 * @returns a code and a message
 */
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

/**
 * A function that add Job Posting to the favorites of the student
 * @param email the email of the student
 * @returns a code and a message
 */
export async function updateFavorites(email: string, jobId: string, action: string) {
	try {
		await Database.setup(process.env.MONGODB_URI);
		const student = await userModel.findOne({ email });
		const jobposting = await jobPostingModel.findById(jobId);
		if (!student) {
			return { code: 400, message: "Your not registered" };
		}
		if (!jobposting) {
			return { code: 400, message: "Error updating favorites" };
		}
		if (!student.favorites) {
			student.favorites = [];
		}

		if (action === "add") {
			student.favorites.addToSet(jobposting);
		} else if (action === "remove") {
			student.favorites.pull(jobposting);
		} else {
			return { code: 400, message: "Action does not exist" };
		}
		await student.save();


		return { code: 200, message: "SUCCESS" };
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
	try {
		let user = null;
		await Database.setup(process.env.MONGODB_URI);
		if (email === "admincoop") {
			user = await adminModel.findOne({ email }).populate("favorites");
		} else {
			user = await userModel.findOne({ email }).populate("favorites");
		}
		if (!user) {
			return { code: 400, message: "User not found." };
		}

		return { code: 200, message: user.favorites };

	} catch (error: any) {
		return { code: 500, message: error.message };
	}
}