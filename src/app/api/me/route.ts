import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { email, token } = await req.json();

    const user = await prisma.user.findUnique({
      where: {
        email,
        status: {
          not: "blocked",
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
            public_id:true
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

    return NextResponse.json(
      {
        success: true,
        user,
        token,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json({
      success: false,
    });
  }
};
