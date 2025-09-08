"use client";

import Empty from "@/components/common/Empty";
import VendorHomeSkeleton from "@/components/common/loader/VendorHomeSkeleton";
import { useCtx } from "@/context/Context";
import { api, formatCurrency } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import StatsCard from "./StatsCard";
import { ChartColumnBig, Heart, ScrollText, Wallet } from "lucide-react";
import { ChartConfig } from "@/components/ui/chart";
import SectionHeading from "../../common/SectionHeading";
import VisitorsBar from "../../common/charts/VisitorsBar";
import BookingPie from "../../common/charts/BookingPie";
import BookingChart from "../../common/charts/BookingChart";
import AllBookings from "../bookings/AllBookings";

const chartConfig = {
  booked: {
    label: "Booked",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

const chartVisitorConfig = {
  visited: {
    label: "Visited",
    color: "var(--primary)",
  },
  wishlist: {
    label: "Wishlist",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const VendorHome = () => {
  const { user } = useCtx();

  const { data, isPending, error } = useQuery({
    queryKey: ["vendorStatus"],
    queryFn: () =>
      api({
        endpoint: `vendor/stats/${user?.id}`,
      }),
    retry: false,
  });

  if (isPending) {
    return <VendorHomeSkeleton />;
  }

  if (error || !data?.data) {
    return (
      <div className="p-4 grid place-items-center bg-white rounded-2xl">
        <Empty text={error?.message} />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          Icon={Wallet}
          label="Earnings"
          value={formatCurrency(data?.data?.earnings)}
        />
        <StatsCard
          Icon={ScrollText}
          label="Total Listing"
          value={data?.data?.totalListing}
        />
        <StatsCard
          Icon={Heart}
          label="Wishlist"
          value={Math.round(Math.random() * 100)}
        />
        <StatsCard
          Icon={ChartColumnBig}
          label="Visitors"
          value={Math.round(Math.random() * 500)}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <div className="bg-white rounded-md border border-solid border-border p-4 min-w-0 overflow-hidden">
          <BookingChart
            chartData={data?.chartData}
            chartConfig={chartConfig}
            dataKey="booked"
            title="Booking Stats"
          />
        </div>
        <div className="bg-white rounded-md border border-solid border-border p-4 min-w-0 overflow-hidden">
          <BookingPie />
        </div>
      </div>
      <div className="mt-6 p-4 bg-white rounded-md border border-solid border-border">
        <SectionHeading>Viewed</SectionHeading>
        <VisitorsBar
          dataKey1="visited"
          datakey2="wishlist"
          chartData={data?.visitorsData}
          chartConfig={chartVisitorConfig}
        />
      </div>
      <div className="mt-6 p-4 bg-white rounded-md border border-solid border-border">
        <SectionHeading>Recent Bookings</SectionHeading>
        <div className="mt-6">
          <AllBookings />
        </div>
      </div>
    </>
  );
};

export default VendorHome;
