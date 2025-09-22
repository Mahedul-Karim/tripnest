"use server";

import { Role } from "@prisma/client";
import prisma from "../db";

const adminHome = async () => {
  try {
    const totalListingsPromise = prisma.tour.count();
    const totalUserCountPromise = prisma.user.count();
    const totalVendorCountPromise = prisma.user.count({
      where: {
        role: "vendor",
      },
    });

    const totalBookingsPromise = prisma.booking.findMany({
      where: {
        status: "completed",
      },
      select: {
        tour: {
          select: {
            price: true,
          },
        },
      },
    });

    const [totalListings, totalUsers, totalVendors, allBookings] =
      await Promise.all([
        totalListingsPromise,
        totalUserCountPromise,
        totalVendorCountPromise,
        totalBookingsPromise,
      ]);

    const totalEarnings = allBookings.reduce(
      (acc, stat) => acc + stat.tour.price,
      0
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
        joined: Math.round(Math.random() * 300),
      };

      const visitorObject = {
        month: month[i],
        newCustomers: Math.round(Math.random() * 214),
        existingCustomers: Math.round(Math.random() * 214),
      };
      chartData.push(chartObject);
      visitorsData.push(visitorObject);
    }

    return {
      success: true,
      data: {
        totalListings,
        totalUsers,
        totalVendors,
        totalEarnings,
        chartData,
        visitorsData,
      },
    };
  } catch (err: any) {
    return {
      success: false,
      data: {
        totalListings: 0,
        totalUsers: 0,
        totalVendors: 0,
        totalEarnings: 0,
        chartData: [],
        visitorsData: [],
        message: err.message,
      },
    };
  }
};

const adminAllBookings = async () => {
  try {
    const bookedTours = await prisma.booking.findMany({
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

    return {
      success: true,
      bookings: bookedTours,
    };
  } catch (err: any) {
    return {
      success: false,
      message: "Something went wrong while fetching bookings",
      bookings: [],
    };
  }
};

const adminAllEarnings = async () => {
  try {
    const bookings = await prisma.booking.findMany({
      where: {
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

    const totalEarnings: number =
      bookings?.reduce((acc, stat) => acc + stat.tour.price, 0) || 0;

    const withdraws = await prisma.withdraw.findMany({
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

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

    return {
      success: true,
      totalEarnings,
      salesThisMonth: Math.round(Math.random() * 500),
      withdraws,
      chartData,
    };
  } catch (err: any) {
    return {
      success: false,
      totalEarnings: 0,
      salesThisMonth: 0,
      withdraws: [],
      chartData: [],
      message: err.message,
    };
  }
};

const updateWithdrawStatus = async (id: string) => {
  try {
    const data = await prisma.withdraw.update({
      where: {
        id,
      },
      data: {
        status: "approved",
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return {
      success: true,
      data,
    };
  } catch (err: any) {
    return {
      success: false,
      message: "Something went wrong while updating withdraw status",
    };
  }
};

const allUsers = async (role: Role) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        role,
      },
      orderBy: {
        joinedAt: "desc",
      },
    });

    return {
      success: true,
      users,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
      users: [],
    };
  }
};

const adminAllTours = async () => {
  try {
    const tours = await prisma.tour.findMany({
      where: {},
      select: {
        id: true,
        tourName: true,
        price: true,
        status: true,
        createdAt: true,
        gallery: {
          select: {
            url: true,
          },
        },
        creatorId: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    if (!tours || tours.length === 0) {
      return {
        success: true,
        tours: [],
      };
    }

    const copiedTours: {
      id: string;
      tourName: string;
      price: number;
      status: string;
      gallery: {
        url: string;
      }[];
      creatorId: string;
      createdAt: Date;
      creator?: {
        firstName: string;
        lastName: string;
      };
    }[] = [...tours];

    await Promise.all(
      copiedTours.map(async (tour, i) => {
        const users = await prisma.user.findUnique({
          where: {
            id: tour.creatorId,
          },
          select: {
            firstName: true,
            lastName: true,
          },
        });
        //@ts-ignore
        copiedTours[i].creator = users;
      })
    );

    return {
      success: true,
      tours: copiedTours,
    };
  } catch (err: any) {
    return {
      success: false,
      tours: [],
      message: err.message,
    };
  }
};

export {
  adminHome,
  adminAllTours,
  adminAllBookings,
  adminAllEarnings,
  updateWithdrawStatus,
  allUsers,
};
