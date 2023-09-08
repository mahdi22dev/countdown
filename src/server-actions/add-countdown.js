"use server";
import { messages } from "@/config/messages";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prismaClient";
import { getServerSession } from "next-auth";

export async function onCreate(formData) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { message: { login: messages.login } };
  }
  const existingUser = await prisma.user.findUnique({
    where: { id: session?.user?.id },
  });

  if (!existingUser) {
    return { message: { Notfound: messages.Notfound } };
  } else {
    try {
      const newCountdown = await prisma.userCountdown.create({
        data: {
          ...formData,
          userId: existingUser.id,
        },
      });

      return { message: { success: messages.success, newCountdown } };
    } catch (error) {
      return { message: { tryagain: messages.tryagain } };
    }
  }
}
