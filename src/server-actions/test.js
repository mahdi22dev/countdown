"use server";

import { prisma } from "@/lib/prismaClient";

export const test = async (id) => {
  const startTime = new Date(); // Record the start time
  try {
    await prisma.$transaction(async (tx) => {
      const countdowns = [];
      for (let i = 1; i <= 100; i++) {
        const title = `Countdown ${i}`;
        const currentDate = new Date();
        const minDays = 1;
        const maxDays = 80;
        const randomDays =
          Math.floor(Math.random() * (maxDays - minDays + 1)) + minDays;
        const targetDate = new Date(
          currentDate.getTime() + randomDays * 24 * 60 * 60 * 1000
        );

        const min = 1;
        const max = 10;
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        const imageId = randomNumber;
        const countdownobject = { title, targetDate, imageId, userId: id };

        countdowns.push(countdownobject);
      }
      const newCountdown = await tx.userCountdown.createMany({
        data: countdowns,
      });
      // console.log("countdown created N*:" + id + newCountdown);
      const endTime = new Date(); // Record the end time
      const executionTime = endTime - startTime;
      console.log("creation completed", newCountdown);
      console.log(`Execution time: ${executionTime} milliseconds`);
    });
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    await prisma.$disconnect();
  }
};
