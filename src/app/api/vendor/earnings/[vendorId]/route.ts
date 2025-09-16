import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  {
    params,
  }: {
    params: Promise<{ vendorId: string }>;
  }
) => {
  const { vendorId } = await params;

  try {
    const bookingPromise = prisma.booking.findMany({
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

    const bankDetailsPromise = prisma.bankDetails.findUnique({
      where: {
        userId: vendorId,
      },
    });

    const withdrawPromise = prisma.withdraw.aggregate({
      where: {
        userId: vendorId,
      },
      _sum: {
        amount: true,
      },
    });

    const withdrawPendingPromise = prisma.withdraw.aggregate({
      where: {
        userId: vendorId,
        status: {
          equals: "pending",
          mode: "insensitive",
        },
      },
      _sum: {
        amount: true,
      },
    });

    const [bookingData, bankDetailsData, withdrawData, withdrawPendingData] =
      await Promise.all([
        bookingPromise,
        bankDetailsPromise,
        withdrawPromise,
        withdrawPendingPromise,
      ]);

    const earningObject: any = {};

    const totalEarnings: number =
      bookingData?.reduce((acc, stat) => acc + stat.tour.price, 0) || 0;

    earningObject.earnings = totalEarnings;

    earningObject.bankData = !bankDetailsData ? null : bankDetailsData;

    earningObject.availableBalance = !withdrawData._sum.amount
      ? totalEarnings
      : totalEarnings - withdrawData._sum.amount;

    earningObject.withdrawPending = !withdrawPendingData._sum.amount
      ? 0
      : withdrawPendingData._sum.amount;

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
        sales: Math.round(Math.random() * 300),
      };

      chartData.push(chartObject);
    }

    return NextResponse.json({
      success: true,
      data: earningObject,
      chartData,
    });
  } catch (err: any) {
    console.log(err.message);
    return NextResponse.json({
      success: false,
      message: "Something went wrong while fetching data",
    });
  }
};
