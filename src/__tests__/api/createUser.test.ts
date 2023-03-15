import { NextApiRequest } from "next";
import handler from "@/pages/api/user/create";
import { getUser, deleteUser } from "@/backend/actions/user";
import { User } from "@/interface/User"

describe("createUser API", () => {

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

    it("Should return code 400 Alumni already exists", async () => {
        const email = "000451777@student.vcc.ca";
        const res = getUser(email);

        expect((await res).code).toBe(400);
        expect((await res).message).toBe("User not registered");

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
});
