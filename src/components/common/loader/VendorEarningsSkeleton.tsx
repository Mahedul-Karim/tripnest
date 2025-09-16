import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
const VendorEarningsSkeleton = () => {
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
      </div>
    </>
  );
};

export default VendorEarningsSkeleton;
