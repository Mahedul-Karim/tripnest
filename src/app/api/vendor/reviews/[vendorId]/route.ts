import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (
  req: Request,
  {
    params,
  }: {
    params: Promise<{ vendorId: string }>;
  }
) => {
  const { isAdmin } = await req.json();

  const { vendorId } = await params;


  try {
    const query: any = {};

    if (!isAdmin) {
      query.creatorId = vendorId;
    }

    const allReviewPromise = prisma.review.findMany({
      where: query,
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            image: true,
          },
        },
      },
    });

    const averageRatingPromise = prisma.review.aggregate({
      where: query,
      _avg: {
        total: true,
      },
    });

    const [allReviews, averageRatings] = await Promise.all([
      allReviewPromise,
      averageRatingPromise,
    ]);

    const data = await Promise.all(
      [5, 4, 3, 2, 1].map(async (num) => {
        const res = await prisma.review.count({
          where: {
            ...query,
            total: num,
          },
        });
        return {
          value: res,
          label: num,
        };
      })
    );

    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const currentMonth = new Date().getMonth();

    const chartData = [];

    for (let i = currentMonth - 5; i <= month.length; i++) {
      if (i < 0) {
        i = month.length + i;
      }

      if (i === month.length) {
        i = 0;
      }

      if (chartData.length === 6) {
        break;
      }

      const chartObject = {
        month: month[i],
        goodReview: Math.round(Math.random() * 300),
        badReview: Math.round(Math.random() * 300),
      };

      chartData.push(chartObject);
    }

    return NextResponse.json({
      success: true,
      data,
      chartData,
      allReviews: allReviews.length === 0 || !allReviews ? [] : allReviews,
      averageRatings: averageRatings._avg.total,
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong while fetching data",
    });
  }
};
