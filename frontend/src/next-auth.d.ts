import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user : {
            // _id: string,
            name: string,
            email: string,
            role: string,
            picture: string;
            token: string
        }
    }
}