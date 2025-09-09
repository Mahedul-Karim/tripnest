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
