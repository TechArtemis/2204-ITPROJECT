import { NextApiRequest, NextApiResponse } from "next";
import handler from "@/pages/api/user/create";

describe("createUser API", () => {
    it("should return 400 if name is missing or invalid", async () => {
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

    it("should return 200 if all fields are filled and passes the requirements", async () => {
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

        console.log("Response:", res.status, res.json);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "User Created",
        });
    });

});
