"use client";

import Empty from "@/components/common/Empty";
import { ChartConfig } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { adminHome } from "@/lib/actions/admin";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import StatsCard from "../../vendor/home/StatsCard";
import { formatCurrency } from "@/lib/utils";
import {
  BadgeDollarSign,
  ClipboardList,
  UserRound,
  UserRoundCog,
} from "lucide-react";
import BookingChart from "../../common/charts/BookingChart";
import SectionHeading from "../../common/SectionHeading";
import VisitorsBar from "../../common/charts/VisitorsBar";

const chartConfig = {
  joined: {
    label: "Joined",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

const chartVisitorConfig = {
  newCustomers: {
    label: "New Customers",
    color: "var(--primary)",
  },
  existingCustomers: {
    label: "Existing Customers",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const AdminHome = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["adminHome"],
    queryFn: async () => {
      const res = await adminHome();

      if (!res.success) throw new Error(res.data.message);

      return res.data;
    },
  });

  const chartData = data?.chartData || [];
  const totalEarnings = data?.totalEarnings || 0;
  const totalListings = data?.totalListings || 0;
  const totalUsers = data?.totalUsers || 0;
  const totalVendors = data?.totalVendors || 0;
  const visitorsData = data?.visitorsData || [];

  if (isPending) {
    return (
      <>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Skeleton className="h-[80px]" />
          <Skeleton className="h-[80px]" />
          <Skeleton className="h-[80px]" />
          <Skeleton className="h-[80px]" />
        </div>
        <div className="mt-6">
          <Skeleton className="h-[250px]" />
          <Skeleton className="h-[250px]" />
        </div>
        <div className="mt-6">
          <Skeleton className="h-[250px]" />
        </div>
        <div className="mt-6">
          <Skeleton className="h-[80px]" />
        </div>
      </>
    );
  }

  if (!isPending && error) {
    return (
      <div className="bg-white p-4 rounded-md border border-border">
        <Empty text={error.message} />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          Icon={ClipboardList}
          label="Total Listing"
          value={totalListings}
        />
        <StatsCard Icon={UserRound} label="Total Users" value={totalUsers} />
        <StatsCard
          Icon={UserRoundCog}
          label="Total Vendors"
          value={totalVendors}
        />
        <StatsCard
          Icon={BadgeDollarSign}
          label="Total Earnings"
          value={formatCurrency(totalEarnings)}
        />
      </div>
      <div className="bg-white rounded-md border border-solid border-border p-4 mt-6">
        <BookingChart
          chartData={chartData}
          chartConfig={chartConfig}
          dataKey="joined"
          title="User joined"
        />
      </div>
      <div className="mt-6 p-4 bg-white rounded-md border border-solid border-border">
        <SectionHeading>Customers</SectionHeading>
        <VisitorsBar
          dataKey1="newCustomers"
          datakey2="existingCustomers"
          chartData={visitorsData}
          chartConfig={chartVisitorConfig}
        />
      </div>
    </>
  );
};

export default AdminHome;
