"use server";

import { Status } from "@prisma/client";
import prisma from "../db";

const updateTourStatus = async (updateTo: Status, id: string) => {
  try {
    await prisma.tour.update({
      where: {
        id,
      },
      data: {
        status: updateTo,
      },
    });

    return {
      success: true,
      message: "Tour status updated!",
    };
  } catch (err: any) {
    console.log(err.message);
    return {
      success: false,
      message: "Something went wrong! Please try again later",
    };
  }
};

const getSingleTour = async (id: string) => {
  try {
    const tour = await prisma.tour.findUnique({
      where: {
        id,
      },
      include: {
        reviews: {
          select: {
            comment: true,
            total: true,
            user: {
              select: {
                firstName: true,
                lastName: true,
                image: true,
              },
            },
          },
        },
      },
    });

    if (!tour) {
      return null;
    }

    const overall = await prisma.review.aggregate({
      where: {
        tourId: tour.id,
      },
      _avg: {
        location: true,
        amenities: true,
        food: true,
        price: true,
        rooms: true,
        tourSupport: true,
      },
    });

    return { tour, overall: overall._avg };
  } catch (err) {
    return {
      success: false,
      message: "Something went wrong while fetching tour",
    };
  }
};

const updateBookingStatus = async (id: string, status: string) => {
  try {
    const updatedBookingState = await prisma.booking.update({
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
      tour: updatedBookingState,
    };
  } catch (err: any) {
    return {
      success: false,
      message: "Something went wrong! Please try again later!",
    };
  }
};

export { updateTourStatus, getSingleTour, updateBookingStatus };
