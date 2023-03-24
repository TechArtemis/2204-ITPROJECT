import { NextApiRequest } from "next";
import handler from "@/pages/api/user/create";
import { getUser, deleteUser, createUser } from "@/backend/actions/user";
import { Model as userModel } from "@/backend/database/ODM/User";
import Database from "@/backend/database";

// Test Suite
describe("Create User API", () => {

    // Function that will run after the test is done
	afterAll( async() => {
		await userModel.findOneAndDelete({ email: "000451777@student.vcc.ca" });
		await userModel.findOneAndDelete({ email: "000123456@student.vcc.ca" });

		Database.disconnect();
	});

    // 1st test will check if name is invalid or empty and will receive a response code 400 and message Invalid Name
	it("Should return code 400 if name is missing or invalid", async () => {
		const req = {
			method: "POST",
			body: {
				user: {
					name: "",
					email: "000451777@student.vcc.ca",
					password: "Test12345!",
				},
			},
		} as NextApiRequest;

		const res: any = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};

		await handler(req, res);
		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({
			message: "Invalid Name",
		});
	});

    // 2nd test will check if password is invalid or empty and will receive a response code 400 and message Invalid Password
	it("Should return code 400 if password is missing or invalid", async () => {
		const req = {
			method: "POST",
			body: {
				user: {
					name: "Test3",
					email: "000451777@student.vcc.ca",
					password: "",
				},
			},
		} as NextApiRequest;

		const res: any = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};

		await handler(req, res);
		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({
			message: "Invalid Password",
		});
	});

    // 3rd test will check if all fields are filled and followed the requirements and will receive a response code 201 and message User created
	it("Should return 200 if all fields are filled and passes the requirements", async () => {
		const req = {
			method: "POST",
			body: {
				user: {
					name: "Test John",
					email: "000451777@student.vcc.ca",
					password: "Test12345!",
				},
			},
		} as NextApiRequest;

		const res: any = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};

		await handler(req, res);

		expect(res.status).toHaveBeenCalledWith(201);
		expect(res.json).toHaveBeenCalledWith({
			message: "User created",
		});
	});

    // 4th test will check if the user already exists and will receive a response code of 409 and message User already exists
	it("Should return code 400 if user already exists", async () => {
		const req = {
			method: "POST",
			body: {
				user: {
					name: "Test 2",
					email: "000123456@student.vcc.ca",
					password: "Test12345!",
					favorites: []
				},
			},
		} as NextApiRequest;

		const res: any = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};

		await handler(req, res);
		await handler(req, res);
		expect(res.status).toHaveBeenCalledWith(409);
		expect(res.json).toHaveBeenCalledWith({
			message: "User already exists",
		});

	});
});
