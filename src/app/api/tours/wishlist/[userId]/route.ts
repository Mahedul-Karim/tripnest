import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) => {
  const { userId } = await params;

  try {
    const tours = await prisma.wishlist.findMany({
      where: {
        userId,
      },
      include: {
        tour: {
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
        },
      },
    });

    if (!tours || tours.length === 0) {
      return NextResponse.json({
        success: true,
        tours: [],
      });
    }

    return NextResponse.json({ success: true, tours });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
};
