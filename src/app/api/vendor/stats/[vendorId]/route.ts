import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ vendorId: string }> }
) => {
  const { vendorId } = await params;

  try {
    const data = await prisma.booking.findMany({
      where: {
        tourCreator: vendorId,
        status: {
          equals: "completed",
          mode: "insensitive",
        },
      },
      include: {
        tour: {
          select: {
            price: true,
          },
        },
      },
    });

    const stateObject: any = {};

    if (!data || data.length === 0) {
      stateObject.earnings = 0;
    }

    stateObject.earnings = data.reduce((acc, stat) => acc + stat.tour.price, 0);

    const allListings = await prisma.tour.count({
      where: {
        creatorId: vendorId,
      },
    });

    if (!allListings) {
      stateObject.totalListing = 0;
    } else {
      stateObject.totalListing = allListings;
    }

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
    const visitorsData = [];

    for (let i = currentMonth - 5; i <= month.length; i++) {
      if (i < 0) {
        i = month.length + i;
      }

      if (i === month.length) {
        i = 0;
      }

      if (chartData.length === 6 && visitorsData.length === 6) {
        break;
      }

      const chartObject = {
        month: month[i],
        booked: Math.round(Math.random() * 300),
      };

      const visitorObject = {
        month: month[i],
        visited: Math.round(Math.random() * 214),
        wishlist: Math.round(Math.random() * 214),
      };
      chartData.push(chartObject);
      visitorsData.push(visitorObject);
    }

    return NextResponse.json({
      success: true,
      data: stateObject,
      chartData,
      visitorsData,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
};
