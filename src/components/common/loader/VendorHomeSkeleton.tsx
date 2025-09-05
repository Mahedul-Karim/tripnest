import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const VendorHomeSkeleton = () => {
  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Skeleton className="h-[80px]" />
        <Skeleton className="h-[80px]" />
        <Skeleton className="h-[80px]" />
        <Skeleton className="h-[80px]" />
      </div>
      <div className="grid md:grid-cols-2 gap-4 mt-6">
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
};

export default VendorHomeSkeleton;
