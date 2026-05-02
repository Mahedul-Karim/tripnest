"use client";

import Empty from "@/components/common/Empty";
import { Skeleton } from "@/components/ui/skeleton";
import { useCtx } from "@/context/Context";
import { api } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import StatsCard from "../home/StatsCard";
import { CircleStar, Star } from "lucide-react";
import ReviewsChart from "./ReviewsChart";
import SectionHeading from "../../common/SectionHeading";
import ReviewBar from "./ReviewBar";
import UserReviews from "@/components/tours/details/content/reviews/UserReviews";

interface Props {
  isAdmin?: boolean;
}

const Reviews: React.FC<Props> = ({ isAdmin = false }) => {
  const { user } = useCtx();

  const { data, isPending, error } = useQuery({
    queryKey: ["vendorReviews"],
    queryFn: async () => {
      const data = await api({
        endpoint: `vendor/reviews/${user?.id}`,
        options: {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isAdmin }),
        },
      });

      if (!data.success) {
        throw new Error(data.message);
      }

      return data;
    },
  });

  const reviewMatrics = data?.data || [];
  const chartData = data?.chartData;
  const averageRatings = data?.averageRatings;
  const allReviews = data?.allReviews || [];

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
        <div className="mt-6">
          <Skeleton className="h-[80px]" />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <div className="bg-card p-4 border border-border rounded-md">
        <Empty text={error.message} />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <StatsCard
          Icon={CircleStar}
          label="Average Rating"
          value={Math.round(averageRatings)}
        />
        <StatsCard
          Icon={Star}
          label="Total Reviews"
          value={allReviews?.length}
        />
      </div>
      <div className="bg-card rounded-md border border-solid border-border p-4 mt-6">
        <ReviewsChart chartData={chartData} />
      </div>
      <div className="bg-card rounded-md border border-solid border-border p-4 mt-6">
        <SectionHeading>Review Matrics</SectionHeading>
        <div className="mt-6">
          <div className="py-4 border-t border-b border-dashed border-border flex flex-col gap-3">
            {reviewMatrics?.map((rev: any, i: number) => (
              <ReviewBar
                key={i}
                totalReviews={allReviews?.length}
                label={rev?.label}
                value={rev?.value}
              />
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-6">
            {allReviews?.length > 0 &&
              allReviews.map((rev: any, i: any) => (
                <UserReviews key={i} review={rev} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Reviews;
