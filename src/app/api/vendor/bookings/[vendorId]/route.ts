import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ vendorId: string }> }
) => {
  const { vendorId } = await params;

  try {
    const bookings = await prisma.booking.findMany({
      where: {
        tourCreator: vendorId,
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
      orderBy: {
        createdAt: "desc",
      },
    });

    if (bookings.length === 0 || !bookings) {
      return NextResponse.json({
        success: true,
        bookings: [],
      });
    }

    return NextResponse.json({
      success: true,
      bookings,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
};
