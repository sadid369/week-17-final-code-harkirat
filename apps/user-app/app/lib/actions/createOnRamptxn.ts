"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function createOnRampTransaction(
  amount: number,
  provider: string
) {
  const token = Math.random().toString(36).substring(2, 15);
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  if (!userId) {
    throw new Error("User not authenticated");
  }
  await prisma.onRampTransaction.create({
    data: {
      userId: Number(userId),
      amount: amount,
      status: "Processing",
      provider: provider,
      startTime: new Date(),
      token: token,
    },
  });
}
