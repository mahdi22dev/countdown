import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials.email || !credentials.password) {
          return NextResponse.json(
            { message: "correct the required data" },
            { status: 401 }
          );
        }
        const userEmail = credentials.email;
        console.log(userEmail);
        // check is user email exist
        const existingUser = await prisma.user.findUnique({
          where: { email: userEmail },
        });
        if (!existingUser) {
          return null;
        }
        // compare passwords
        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          existingUser.password
        );
        if (!passwordsMatch) {
          return null;
        }
        return existingUser;
      },
    }),
  ],
  session: { strategy: "jwt" },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
