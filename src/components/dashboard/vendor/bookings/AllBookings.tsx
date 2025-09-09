"use client";

import React, { useState, useEffect } from "react";
import Empty from "@/components/common/Empty";
import { useCtx } from "@/context/Context";
import { Loader } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/utils";
import BookingsTable from "./BookingsTable";

const AllBookings = () => {
  const { user } = useCtx();

  const { data, isPending } = useQuery({
    queryKey: ["vendorBookings"],
    queryFn: () =>
      api({
        endpoint: `vendor/bookings/${user?.id}`,
      }),
    retry: false,
  });

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh_-_100px)] bg-white p-4">
        <Loader className="animate-spin text-primary size-12" />
      </div>
    );
  }

  return (
    <section>
      {data?.bookings?.length === 0 ? (
        <Empty text="No bookings found" />
      ) : (
        <BookingsTable bookings={data?.bookings} />
      )}
    </section>
  );
};

export default AllBookings;
