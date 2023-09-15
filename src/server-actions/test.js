"use server";

import { prisma } from "@/lib/prismaClient";

export const test = async (id) => {
  const startTime = new Date(); // Record the start time
  try {
    await prisma.$transaction(async (tx) => {
      const countdowns = [];
      for (let i = 1; i <= 2000; i++) {
        const title = `Countdown ${i}`;
        const currentDate = new Date();
        const targetDate = new Date(currentDate.getTime() + i * 20 * 60000);
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

  // for (let i = 1; i <= 5000; i++) {
  //   console.log(i);
  //   const title = `Countdown ${i}`;
  //   const currentDate = new Date();
  //   const targetDate = new Date(currentDate.getTime() + i * 20 * 60000);
  //   const min = 1;
  //   const max = 10;
  //   const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  //   const imageId = randomNumber;
  //   const countdownobject = { title, targetDate, imageId, imageId };
  //   const newCountdown = await prisma.userCountdown.create({
  //     data: {
  //       ...countdownobject,
  //       userId: id,
  //     },
  //   });
  //   console.log("countdown created =>" + newCountdown);
  // }
};
