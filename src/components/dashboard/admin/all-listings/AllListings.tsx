"use client";

import Empty from "@/components/common/Empty";
import { adminAllTours } from "@/lib/actions/admin";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import React from "react";
import ListingsTable from "./ListingsTable";

const AllListings = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["adminAllTours"],
    queryFn: async () => {
      const res = await adminAllTours();

      if (!res.success) throw new Error(res.message);

      return res;
    },
  });

  const tours = data?.tours || [];

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
      {tours.length === 0 ? (
        <Empty text="No listings found" />
      ) : (
        <ListingsTable data={tours} />
      )}
    </div>
  );
};

export default AllListings;
