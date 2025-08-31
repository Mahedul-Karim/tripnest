"use server";

import prisma from "../db";

export const register = async (data: any) => {
  const { firstName, lastName, email } = data;

  try {
    await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
      },
    });

    return {
      success: true,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err,
    };
  }
};
