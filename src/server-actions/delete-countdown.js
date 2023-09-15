"use server";
import { messages } from "@/config/messages";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prismaClient";
import { getServerSession } from "next-auth";

export const deleteCountdown = async (countdownId) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return { message: { login: messages.login } };
    }
    const deletedCountdown = await prisma.UserCountdown.delete({
      where: { id: countdownId },
    });
    if (!deletedCountdown) {
      return {
        message: {
          tryagain: messages.tryagain,
          deletedCountdown,
        },
      };
    }
    return { message: { success: messages.deleted, deletedCountdown } };
  } catch (error) {
    return { message: { error: error } };
  }
};