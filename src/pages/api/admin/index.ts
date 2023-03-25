// Third-party import
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

// Local import
import { Admin } from "@/interface/Admin";
import { EMAIL_REGEX, PASSWORD_REGEX } from "@/shared/regex";
import { createAdmin } from "@/backend/actions/admin";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		try {
			const { admin } = req.body;

			/**
             * the following if conditions validates the input
             */
			if (admin.email !== "admincoop") {
				throw {
					code: 400,
					message: "Invalid Username"
				};
			}
			if (!PASSWORD_REGEX.test(admin.password)) {
				throw {
					code: 400,
					message: "Invalid Password"
				};
			}
			const hashed= await bcrypt.hash(admin.password, 12);
			const newAdmin: Admin = {
				email: admin.email,
				password: hashed,
				name: "Admin"
			};

			// creates the admin account
			const response = await createAdmin(newAdmin);

			// if invalid, throw error
			if (response.code !== 200) {
				throw {
					code: 400,
					message: response.message
				};
			}

			// response to front-end
			res.status(response.code).json(
				{
					message: response.message
				}
			);
		} catch (error: any) {
			const { code = 500, message } = error;
			res.status(code).json(
				{
					message
				}
			);
		}
	}
	else {
		res.status(405).json(
			{
				message: "Invalid Method"
			}
		);
	}
}