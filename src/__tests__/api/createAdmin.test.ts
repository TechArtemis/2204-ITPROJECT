import handler from "@/pages/api/admin";
import { NextApiRequest } from "next";
import { Model as adminModel } from "@/backend/database/ODM/Admin";
import Database from "@/backend/database";
import { Admin } from "@/interface/Admin";
import { createAdmin } from "@/backend/actions/admin";

describe("createUser API", () => {

    // beforeAll(() => {
    //     const admin: Admin = {
    //         email: "test",
    //         password: "pass.123",

    //     };
    //     createAdmin(admin);
    // });

    afterAll( async() => {
        await adminModel.findOneAndDelete({ email: "test@mail.co" });
        Database.disconnect();
    });
    it("Should return code 400 if email is missing or invalid", async () => {
        const req = {
            method: "POST",
            body: {
                admin: {
                    email: "test",
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
            message: "Invalid Email",
        });
    });

    it("Should return 200 if all fields are filled and passes the requirements, the Admin account is then made", async () => {
        const req = {
            method: "POST",
            body: {
                admin: {
                    email: "test@mail.com",
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
            message: "Successful",
        });
    });


    it("Should return code 400 if Admin already exists", async () => {
        const req = {
            method: "POST",
            body: {
                admin: {
                    email: "test@mail.com",
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
            message: "Admin already exists",
        });

    });
});
