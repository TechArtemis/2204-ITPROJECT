import handler from "@/pages/api/admin";
import emailHandler from "@/pages/api/admin/[email]";
import { NextApiRequest } from "next";
import { Model as adminModel } from "@/backend/database/ODM/Admin";
import Database from "@/backend/database";
import { signIn } from "next-auth/react";
import { Session } from "next-auth";

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

    it("When admin account is made, and no admin account exists yet, should return 200", async () => {
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

    // it("Should return a code 200 if password change is successful", async () => {
    //     const email = "test@mail.com";
    //     const password = "Test12345!";
    //     const newPassword = "Test.123";
    //     await signIn("credentials", { redirect: false, email, password });
    //     const req = {
    //         method: "PUT",
    //         query: {
    //             email,
    //             password,
    //             newPassword
    //         }
    //     } as unknown as NextApiRequest;
    //     const res: any = {
    //         status: jest.fn().mockReturnThis(),
    //         json: jest.fn(),
    //     };
    //     await emailHandler(req, res);
    //     expect(res.status).toHaveBeenCalledWith(200);
    //     expect(res.json).toHaveBeenCalledWith(

    //         {
    //             message: "Password Change Success"
    //         }
    //     );
    // });

    it("When admin exists, it should return an ERROR, return 400", async () => {
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
