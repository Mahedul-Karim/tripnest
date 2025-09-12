import { configCloudinary, uploadToCloudinary } from "@/lib/cloudinary";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = req.nextUrl;

    const type = searchParams.get("type") || "";
    const duration = searchParams.get("duration") || "";
    const price = searchParams.get("price") || "";
    const rating = searchParams.get("rating") || "";
    const search = searchParams.get("search") || "";

    const query: any = {
      status: "approved",
    };

    if (type) {
      query.category = {
        equals: type,
        mode: "insensitive",
      };
    }

    if (duration) {
      query.duration = {
        contains: duration,
        mode: "insensitive",
      };
    }

    if (price) {
      const splitPrice = price.split("-");
      const lowPrice = splitPrice.at(0);
      const highPrice = splitPrice.at(1);

      query.AND = [
        {
          price: {
            gte: +lowPrice!,
          },
        },
        {
          price: {
            lte: +highPrice!,
          },
        },
      ];
    }

    if (rating) {
      const numberArray = rating.split("-").map((rat: string) => +rat);

      query.totalRatings = {
        in: numberArray,
      };
    }

    if (search) {
      query.tourName = {
        contains: search,
        mode: "insensitive",
      };
    }

    const tours = await prisma.tour.findMany({
      where: query,
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

export const POST = async (req: NextRequest) => {
  try {
    configCloudinary();

    const values = await req.json();

    const gallery: {
      public_id: string;
      url: string;
    }[] = [];

    if (values.gallery.length > 0) {
      await Promise.all(
        values.gallery.map(async (img: string) => {
          const result = await uploadToCloudinary(img);

          gallery.push({
            public_id: result.public_id,
            url: result.url,
          });
        })
      );
    }

    await prisma.tour.create({
      data: { ...values, gallery },
    });

    return NextResponse.json(
      {
        success: true,
      },
      {
        status: 201,
      }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong! Please try again later",
      },
      {
        status: 501,
      }
    );
  }
};

export const PATCH = async (req: NextRequest) => {
  try {
    const { id, gallery, ...tourData } = await req.json();

    await prisma.tour.update({
      where: {
        id,
      },
      data: { ...tourData },
    });

    return NextResponse.json(
      {
        success: true,
      },
      {
        status: 201,
      }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong! Please try again later",
      },
      {
        status: 501,
      }
    );
  }
};
