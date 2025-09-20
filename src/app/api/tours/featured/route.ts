import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const tours = await prisma.tour.findMany({
      select: {
        tourName: true,
        id: true,
        location: true,
        gallery: {
          select: {
            url: true,
          },
        },
        duration: true,
        price: true,
        totalRatings: true,
        overview: true,
        reviews: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 8,
    });

    return NextResponse.json(
      {
        success: true,
        tours,
      },
      {
        status: 200,
      }
    );
  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while fetching tours",
        tours: [],
      },
      {
        status: 500,
      }
    );
  }
};
