"use server";

import {
  configCloudinary,
  deleteFromCloudinary,
  uploadToCloudinary,
} from "../cloudinary";
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

export const uploadUserImage = async (
  image: string,
  email: string,
  public_id: string
) => {
  try {
    configCloudinary();

    if (public_id) {
      await deleteFromCloudinary(public_id);
    }

    const result = await uploadToCloudinary(image);

    const user = await prisma.user.update({
      where: {
        email,
      },
      data: {
        image: {
          public_id: result.public_id,
          url: result.url,
        },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        image: {
          select: {
            url: true,
            public_id: true,
          },
        },
        phoneNumber: true,
        bio: true,
        role: true,
      },
    });

    return {
      success: true,
      user,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    };
  }
};
