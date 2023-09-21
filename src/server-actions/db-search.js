"use server";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

export async function searchCountdownsByTitle(value) {
  const session = await getServerSession(authOptions);
  const userId = session.user.id;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        countdowns: {
          where: {
            title: {
              contains: value,
              startsWith: value,
            },
          },
          take: 50,
        },
      },
    });
    console.log(user);
    return user;
  } catch (error) {
    console.error("Error searching countdowns:", error);
  } finally {
    await prisma.$disconnect();
  }
}
