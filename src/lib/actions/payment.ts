"use server";

import Stripe from "stripe";
import prisma from "../db";

const stripe = new Stripe(process.env.STRIPE_SECRET as string);

const getPayment = async (amount: number) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return {
      success: true,
      client_secret: paymentIntent.client_secret,
    };
  } catch (err: any) {
    console.log(err.message);
    return {
      success: false,
      message: "Something went wrong! Please try again later!",
    };
  }
};

const bookTour = async (
  startDate: Date,
  endDate: Date,
  totalPeople: number,
  userId: string,
  tourId: string,
  tourCreator: string
) => {
  try {
    const data = await prisma.booking.create({
      data: {
        startDate,
        endDate,
        totalPeople,
        userId,
        tourId,
        status: "paid",
        tourCreator,
      },
    });


    return {
      success: true,
      message: "Tour booked successfully!",
      id: data.id,
    };
  } catch (err: any) {
    console.log(err.message);
    return {
      success: false,
      message: "Something went wrong! Please try again later!",
    };
  }
};

const deleteBooking = async (id: string) => {
  await prisma.booking.delete({
    where: {
      id,
    },
  });
};

export { getPayment, bookTour, deleteBooking };