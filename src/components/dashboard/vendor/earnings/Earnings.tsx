"use client";

import VendorEarningsSkeleton from "@/components/common/loader/VendorEarningsSkeleton";
import { useCtx } from "@/context/Context";
import { api, formatCurrency } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import StatsCard from "../home/StatsCard";
import { ChartPie, HandCoins, Landmark, Wallet } from "lucide-react";
import WithdrawButtons from "./WithdrawButtons";
import SalesChart from "./SalesChart";

const Earnings = () => {
  const { user } = useCtx();

  const { isPending, data } = useQuery({
    queryKey: ["vendorEarnings"],
    queryFn: () =>
      api({
        endpoint: `vendor/earnings/${user?.id}`,
      }),
  });

  const bankData = data?.data?.bankData;
  const chartData = data?.chartData;

  if (isPending) {
    return <VendorEarningsSkeleton />;
  }

  return (
    <>
      <div className="flex items-center justify-end gap-4 mb-6">
        <WithdrawButtons
          bankDetails={bankData}
          availableBalance={data?.data?.availableBalance}
        />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          Icon={Wallet}
          label="Total Earnings"
          value={formatCurrency(data?.data?.earnings || 0)}
        />
        <StatsCard
          Icon={ChartPie}
          label="Sales this month"
          value={formatCurrency(Math.round(Math.random() * 500))}
        />
        <StatsCard
          Icon={Landmark}
          label="Available Balance"
          value={formatCurrency(data?.data?.availableBalance || 0)}
        />
        <StatsCard
          Icon={HandCoins}
          label="Withdraw Pending"
          value={formatCurrency(data?.data?.withdrawPending || 0)}
        />
      </div>
      <div className="bg-white rounded-md border border-solid border-border p-4 mt-6">
        <SalesChart chartData={chartData} />
      </div>
    </>
  );
};

export default Earnings;
