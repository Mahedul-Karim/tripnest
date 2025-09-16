"use server";

import prisma from "../db";

export const updateBookingStatus = async (id: string, status: string) => {
  try {
    await prisma.booking.update({
      where: {
        id,
      },
      data: {
        status,
      },
      include: {
        tour: {
          select: {
            tourName: true,
            gallery: true,
            price: true,
          },
        },
      },
    });

    return {
      success: true,
    };
  } catch (err: any) {
    return {
      success: false,
      message: "Something went wrong! Please try again later!",
    };
  }
};

export const addBankDetails = async ({
  name,
  country,
  swiftCode,
  bankAccountNumber,
  bankHolderName,
  userId,
}: {
  [key: string]: string;
}) => {
  try {
    const bankData = await prisma.bankDetails.create({
      data: {
        name,
        country,
        swiftCode,
        bankAcccountNumber: bankAccountNumber,
        bankHolderName,
        userId,
      },
    });

    return {
      success: true,
      bankData,
    };
  } catch (err: any) {
    console.log(err.message);
    return {
      success: false,
      message: "Something went wrong! Please try again later",
    };
  }
};
export const removeBankDetails = async (id: string) => {
  try {
    await prisma.bankDetails.delete({
      where: {
        id,
      },
    });

    return {
      success: true,
      message: "Bank data deleted successfully",
    };
  } catch (err: any) {
    console.log(err.message);
    return {
      success: false,
      message: "Something went wrong! Please try again later",
    };
  }
};

export const requestForWithdraw = async (
  userId: string,
  accountNumber: string,
  amount: number
) => {
  try {
    await prisma.withdraw.create({
      data: {
        userId,
        accountNumber,
        amount,
        status: "pending",
      },
    });

    return {
      success: true,
      message: "Withdraw request has been submitted",
    };
  } catch (err: any) {
    return {
      success: false,
      message: "Something went wrong! Please try again later",
    };
  }
};
