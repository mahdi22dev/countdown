import bcrypt from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log(credentials);
        if (!credentials.email || !credentials.password) {
          return NextResponse.json(
            { message: "correct the required data" },
            { status: 401 }
          );
        }
        const userEmail = credentials.email;

        // check is user email exist
        const existingUser = await prisma.user.findUnique({
          where: { email: userEmail },
        });
        if (!existingUser) {
          console.log("not found");
          return null;
        }
        // compare passwords
        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          existingUser.password
        );
        if (!passwordsMatch) {
          console.log("not matched");
          return null;
        }
        console.log("matched");
        return existingUser;
      },
    }),
  ],
  session: { strategy: "jwt" },

  pages: {
    signIn: "/login",
    error: "/api/auth/error",
  },
};
