import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) => {
  try {
    const { userId } = await params;

    const bookedTours = await prisma.booking.findMany({
      where: {
        userId,
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

    if (!bookedTours || bookedTours.length === 0) {
      return NextResponse.json({
        success: true,
        tours: [],
      });
    }

    return NextResponse.json({ success: true, tours: bookedTours });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
};
