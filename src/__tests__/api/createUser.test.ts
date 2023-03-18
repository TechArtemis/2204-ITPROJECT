import { NextApiRequest } from "next";
import handler from "@/pages/api/user/create";
import { getUser, deleteUser, createUser } from "@/backend/actions/user";
import { Model as userModel } from "@/backend/database/ODM/User";
import Database from "@/backend/database";

describe("createUser API", () => {

    beforeAll(() => {
        const newUser = new userModel(
            {
                name: "Test 2",
                email: "000123456@student.vcc.ca",
                password: "Test12345!",
                favorites: []
            }
        );
        createUser(newUser);
    });

    afterAll( async() => {
        await userModel.findOneAndDelete({ email: "000451777@student.vcc.ca" });
        await userModel.findOneAndDelete({ email: "000123456@student.vcc.ca" });

        Database.disconnect();
    });
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

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "User created",
        });
    });

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
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: "Alumni already exists",
        });

    });
});
