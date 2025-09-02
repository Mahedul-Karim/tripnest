"use client";

import React, { useEffect, useState } from "react";
import LoadingCard from "./LoadingCard";
import Empty from "@/components/common/Empty";
import { useCtx } from "@/context/Context";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/utils";
import BookingCard from "./BookingCard";

const Bookings = () => {
  const { user } = useCtx();

  const [bookingData, setBookingData] = useState<BookedTours[]>([]);

  const { data, isPending, error } = useQuery({
    queryKey: ["userBookedTours", user?.id],
    queryFn: () => api({ endpoint: `user/bookedTours/${user?.id}` }),
    retry: false,
  });

  useEffect(() => {
    if (data?.tours) {
      setBookingData(data?.tours);
    }
  }, [data]);

  if (isPending) {
    return (
      <div className="mt-4 border border-solid border-border rounded-md overflow-clip bookingsCard">
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
      </div>
    );
  }

  return (
    <>
      {bookingData?.length > 0 ? (
        <div className="mt-4 border border-solid border-border rounded-md overflow-clip bookingsCard">
          {bookingData?.map((dat: any, i: number, arr: any) => (
            <BookingCard
              key={i}
              bookingId={dat?.id}
              tourId={dat?.tourId}
              status={dat?.status}
              startDate={dat?.startDate}
              endDate={dat?.endDate}
              totalPeople={dat?.totalPeople}
              tour={dat?.tour}
              createdAt={dat?.createdAt}
              isReviewd={dat?.isReviewd}
              creatorId={dat?.tourCreator}
              bookings={arr}
              setData={setBookingData}
            />
          ))}
        </div>
      ) : (
        <Empty text="You have not booked any tours" />
      )}
    </>
  );
};

export default Bookings;
