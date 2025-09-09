"use client";

import Empty from "@/components/common/Empty";
import { useCtx } from "@/context/Context";
import { api } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import React from "react";
import ListingsTable from "./ListingsTable";

const AllListings = () => {
  const { user } = useCtx();

  const { data, isPending } = useQuery({
    queryKey: ["vendorListings"],
    queryFn: () => api({ endpoint: `vendor/listings/${user?.id}` }),
    retry: false,
  });

  if (isPending) {
    return (
      <div className="mt-6 grid place-items-center py-12">
        <Loader className="animate-spin text-primary size-12" />
      </div>
    );
  }

  return (
    <div className="mt-6">
      {data?.tours?.length === 0 ? (
        <Empty text="No listings found" />
      ) : (
        <ListingsTable tours={data?.tours} />
      )}
    </div>
  );
};

export default AllListings;
