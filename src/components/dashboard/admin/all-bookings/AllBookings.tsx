"use client";
import Empty from "@/components/common/Empty";
import { adminAllBookings } from "@/lib/actions/admin";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import React from "react";
import BookingsTable from "./BookingsTable";

const AllBookings = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["adminAllBookings"],
    queryFn: async () => {
      const res = await adminAllBookings();

      if (!res.success) throw new Error(res.message);

      return res;
    },
  });

  const bookings = data?.bookings || [];

  if (isPending) {
    return (
      <div className="mt-6 flex items-center justify-center h-full">
        <Loader className="size-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!isPending && error) {
    return (
      <div className="bg-white p-4 rounded-md border border-border mt-6">
        <Empty text={error.message} />
      </div>
    );
  }

  return (
    <div className="mt-6">
      {bookings.length === 0 ? (
        <Empty text="No listings found" />
      ) : (
        <BookingsTable data={bookings} />
      )}
    </div>
  );
};

export default AllBookings;
