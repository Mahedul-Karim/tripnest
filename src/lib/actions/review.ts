"use server";

import prisma from "../db";

type Reviews = {
  location: number;
  amenities: number;
  food: number;
  room: number;
  price: number;
  tourOperator: number;
  tourId: string;
  userId: string;
  comment: string;
  creatorId: string;
  bookingId: string;
};

const writeReview = async ({
  location,
  amenities,
  food,
  room,
  price,
  tourOperator,
  tourId,
  userId,
  comment,
  creatorId,
  bookingId,
}: Reviews) => {
  try {
    const sumRatings =
      (location + amenities + food + room + price + tourOperator) / 6;

    const total = Number(sumRatings.toFixed(2));

    const reviewPromise = prisma.review.create({
      data: {
        location,
        amenities,
        food,
        rooms: room,
        price,
        tourSupport: tourOperator,
        comment,
        userId,
        tourId,
        creatorId,
        total,
      },
    });
    const bookingPromise = prisma.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        isReviewd: true,
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

    const [_, booking] = await Promise.all([reviewPromise, bookingPromise]);

    const avgRatings = await prisma.review.aggregate({
      where: {
        tourId,
      },
      _avg: {
        total: true,
      },
    });

    await prisma.tour.update({
      where: {
        id: tourId,
      },
      data: {
        totalRatings: Math.round(avgRatings._avg.total!),
      },
    });

    return {
      success: true,
      message: "Review posted successfully!",
    };
  } catch (err: any) {
    console.log(err.message);
    return {
      success: false,
      message: err.message,
    };
  }
};

export { writeReview };
