"use client";

import Empty from "@/components/common/Empty";
import VendorHomeSkeleton from "@/components/common/loader/VendorHomeSkeleton";
import { useCtx } from "@/context/Context";
import { api, formatCurrency } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import StatsCard from "./StatsCard";
import { ChartColumnBig, Heart, ScrollText, Wallet } from "lucide-react";

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
    </>
  );
};

export default VendorHome;
