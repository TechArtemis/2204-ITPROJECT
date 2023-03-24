// tests/next-auth.test.ts
import { Model as userModel } from "@/backend/database/ODM/User";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import bcrypt from "bcrypt";
import { CredentialsConfig } from "next-auth/providers";

jest.mock("@/backend/database/ODM/User");

describe("NextAuth login", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test("successfully logs in with correct credentials", async () => {
        const email = "000444111@student.vcc";
        const password = "password123@";
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {
            name: "Test Steven",
            email,
            password: hashedPassword,
        };

        userModel.findOne = jest.fn().mockResolvedValue(user);

        const credentialsProvider = authOptions.providers[0] as CredentialsConfig<any>;
        const authorizedUser = await credentialsProvider.authorize({ email, password }, {});

        expect(authorizedUser).toEqual({ name: user.name, email: user.email });
    });

    test("fails to log in with incorrect password", async () => {
        const email = "test@example.com";
        const password = "wrong_password";
        const hashedPassword = await bcrypt.hash("password123", 10);
        const user = {
            name: "Test User",
            email,
            password: hashedPassword,
        };

        userModel.findOne = jest.fn().mockResolvedValue(user);

        const credentialsProvider = authOptions.providers[0] as CredentialsConfig<any>;
        const authorizedUser = await credentialsProvider.authorize({ email, password }, {});

        expect(authorizedUser).toBe(null);
    });

    test("fails to log in with nonexistent email", async () => {
        const email = "nonexistent@example.com";
        const password = "password123";

        userModel.findOne = jest.fn().mockResolvedValue(null);

        const credentialsProvider = authOptions.providers[0] as CredentialsConfig<any>;
        const authorizedUser = await credentialsProvider.authorize({ email, password }, {});

        expect(authorizedUser).toBe(null);
    });
});
