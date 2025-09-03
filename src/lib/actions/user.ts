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
  public_id: string | undefined
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

export const requestForVendor = async (email: string) => {
  try {
    const user = await prisma.user.update({
      where: {
        email,
      },
      data: {
        role: "vendor",
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

interface UserInfo {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  bio?: string;
}

export const updateUserDetails = async (details: UserInfo) => {
  const { firstName, lastName, email, phoneNumber, bio } = details;

  try {
    const user = await prisma.user.update({
      where: {
        email,
      },
      data: {
        firstName,
        lastName,
        phoneNumber,
        bio,
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
        wishlist: {
          select: {
            tourId: true,
          },
        },
        writtenReviews: {
          select: {
            tourId: true,
          },
        },
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

export const addTourToWishlist = async ({
  userId,
  tourId,
}: {
  userId: string;
  tourId: string;
}) => {
  try {
    await prisma.wishlist.create({
      data: {
        userId,
        tourId,
      },
    });

    return {
      success: true,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    };
  }
};

export const removeFromWishlist = async ({
  userId,
  tourId,
}: {
  userId: string;
  tourId: string;
}) => {
  try {
    const wishlist = await prisma.wishlist.findFirst({
      where: {
        userId: userId,
        tourId: tourId,
      },
    });

    await prisma.wishlist.delete({
      where: {
        id: wishlist?.id,
      },
    });

    return {
      success: true,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    };
  }
};
