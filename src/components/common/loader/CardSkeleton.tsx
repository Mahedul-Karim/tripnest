import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const CardSkeleton = () => {
  return (
    <div>
      <div>
        <Skeleton className="w-full aspect-[16/10]" />
      </div>
      <div className="flex flex-col py-[10px]">
        <Skeleton className="h-[40px] mt-1" />
      </div>
    </div>
  );
};

export default CardSkeleton;
