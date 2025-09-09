import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (req:Request,{
  params,
}: {
  params: Promise<{ vendorId: string }>;
}) => {
  const { vendorId } = await params;

  try {
    const tours = await prisma.tour.findMany({
      where: {
        creatorId: vendorId,
      },
    });

    if (!tours || tours.length === 0) {
      return NextResponse.json({
        success: true,
        tours: [],
      });
    }

    return NextResponse.json({
      success: true,
      tours,
    });
  } catch (err: any) {
    console.log(err.message);
    return NextResponse.json({
      success: false,
      message: err.message,
    });
  }
};
