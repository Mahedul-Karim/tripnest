import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingCard = () => {
  return (
    <div className="grid sm:grid-cols-[0.5fr_1fr_0.7fr] gap-3 py-4 px-3">
      <div className="w-full sm:h-[120px]">
        <Skeleton className="aspect-video sm:aspect-auto sm:h-full rounded-md w-full" />
      </div>
      <div className="flex flex-col gap-1 justify-center">
        <Skeleton className="h-[56px]" />
        <Skeleton className="h-[20px]" />
        <Skeleton className="h-[20px]" />
      </div>
      <div className="hidden sm:flex flex-col gap-1 justify-center text-text text-xs xs:text-sm lg:text-base">
        <Skeleton className="h-[24px]" />
        <Skeleton className="h-[24px]" />
        <Skeleton className="h-[24px]" />
        <Skeleton className="h-[24px]" />
      </div>
    </div>
  );
};

export default LoadingCard;