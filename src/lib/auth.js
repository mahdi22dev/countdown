import bcrypt from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { NextResponse } from "next/server";
import GitHubProvider from "next-auth/providers/github";
import { prisma } from "./prismaClient";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
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
  pages: {
    signIn: "/auth/login",
    error: "/api/auth/error",
  },
  debug: process.env.NODE_ENV !== "production",
  callbacks: {
    jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user?.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
};
