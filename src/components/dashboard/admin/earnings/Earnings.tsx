"use client";

import Empty from "@/components/common/Empty";
import { Skeleton } from "@/components/ui/skeleton";
import { adminAllEarnings } from "@/lib/actions/admin";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import StatsCard from "../../vendor/home/StatsCard";
import { formatCurrency } from "@/lib/utils";
import { ChartBar, Wallet } from "lucide-react";
import SalesChart from "../../vendor/earnings/SalesChart";
import SectionHeading from "../../common/SectionHeading";
import WithdrawTable from "./WithdrawTable";

const Earnings = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["adminAllEarnings"],
    queryFn: async () => {
      const res = await adminAllEarnings();

      if (!res.success) throw new Error(res.message);

      return res;
    },
  });

  const chartData = data?.chartData || [];
  const totalEarnings = data?.totalEarnings || 0;
  const salesThisMonth = data?.salesThisMonth || 0;
  const withdraws = data?.withdraws || [];

  if (isPending) {
    return (
      <>
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-[80px]" />
          <Skeleton className="h-[80px]" />
        </div>
        <div className="mt-6">
          <Skeleton className="h-[250px]" />
        </div>
      </>
    );
  }

  if (!isPending && error) {
    return (
      <div className="bg-card p-4 rounded-md border border-border">
        <Empty text={error.message} />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <StatsCard
          Icon={Wallet}
          label="Total Earnings"
          value={formatCurrency(totalEarnings)}
        />
        <StatsCard
          Icon={ChartBar}
          label="Sales this month"
          value={formatCurrency(salesThisMonth)}
        />
      </div>
      <div className="bg-card rounded-md border border-solid border-border p-4 mt-6">
        <SalesChart chartData={chartData} />
      </div>
      <div className="p-4 bg-card border-border border border-solid rounded-md mt-6">
        <SectionHeading>Withdraw Request&apos;s</SectionHeading>
        <div className="mt-6">
          {withdraws.length === 0 ? (
            <Empty />
          ) : (
            <WithdrawTable data={withdraws} />
          )}
        </div>
      </div>
    </>
  );
};

export default Earnings;
