"use server";
// Compare this snippet from apps/user-app/app/lib/actions/createOnRamptxn.ts:
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

export default async function p2pTransfer(to: string, amount: number) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  if (!userId) {
    throw new Error("User not authenticated");
  }
  const user2 = await prisma.user.findFirst({
    where: {
      number: to,
    },
  });
  if (!user2) {
    throw new Error("User not found");
  }
  //   await prisma.$transaction([
  //     prisma.balance.update({
  //       where: {
  //         userId: Number(userId),
  //       },
  //       data: {
  //         amount: {
  //           decrement: amount,
  //         },
  //       },
  //     }),
  //     prisma.balance.update({
  //       where: {
  //         userId: Number(to),
  //       },
  //       data: {
  //         amount: {
  //           increment: amount,
  //         },
  //       },
  //     }),
  //   ]);
  await prisma.$transaction(async (trx) => {
    const fromBalance = await trx.balance.findUnique({
      where: {
        userId: Number(userId),
      },
    });
    if (!fromBalance || fromBalance.amount < amount) {
      throw new Error("Insufficient balance");
    }
    await trx.balance.update({
      where: {
        userId: Number(userId),
      },
      data: {
        amount: {
          decrement: amount,
        },
      },
    });
    await trx.balance.update({
      where: {
        userId: user2.id,
      },
      data: {
        amount: {
          increment: amount,
        },
      },
    });
  });
  return true;
}
