// Third-party import
import NextAuth from "next-auth/next";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
// Local import
import Database from "@/backend/database";
import { Model as userModel } from "@/backend/database/ODM/User";
import { NextAuthOptions } from "next-auth";
import { User } from "@/interface/User";
import { model } from "mongoose";

const clientPromise = Database.setupAdapterConnection();

export const authOptions: NextAuthOptions = ({
    adapter: MongoDBAdapter(clientPromise),
    session: {
        strategy: "jwt"
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: "Email", type: "text", placeholder: "email" },
                password: { label: "Password", type: "text", placeholder: "email" }
            },
            async authorize(credentials) {
                // extract username, password from credentials
                const { email, password }: any = credentials;
                // wait for db connection
                await Database.setup(process.env.MONGODB_URI);
                // Find a user given the username
                const user = await userModel.findOne({ email });
                console.log(user);
                // If the user isn't logged in / not signed in properly
                if (!user) {
                    return null;
                }
                // user.password is always encrypted
                const isValid = await bcrypt.compare(password, user.password);
                if (!isValid) {
                    return null;
                }
                return {
                    name: user.name,
                    email: user.email
                } as any;
            }
        })
    ],
    pages: {
        signIn: "/login"
    },
    callbacks: {
        async jwt({ token, user }) {
            // console.log('JWT: token', JSON.stringify(token));
            // console.log('JWT: user', JSON.stringify(user));
            // console.log('JWT: account', JSON.stringify(account));
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token }) {
            // console.log('SESSSION: token', JSON.stringify(token));
            // console.log('SESSSION: user', JSON.stringify(user));
            if (token && token.user) {
                session.user = token.user;
            }
            return session;
        }
    }
});

export default NextAuth(authOptions);