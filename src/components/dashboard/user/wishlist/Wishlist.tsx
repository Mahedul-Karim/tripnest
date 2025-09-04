"use client";

import CardSkeleton from "@/components/common/loader/CardSkeleton";
import { useCtx } from "@/context/Context";
import React from "react";
import Empty from "@/components/common/Empty";
import GridCard from "@/components/tours/GridCard";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/utils";

interface Wishlists {
  userId: string;
  tourId: string;
  id: string;
  tour: {
    id: string;
    tourName: string;
    location: string;
    duration: string;
    price: number;
    overview: string;
    gallery: {
      url: string;
    }[];
    totalRatings: number;
    reviews: {
      id: string;
    }[];
  };
}

const Wishlist = () => {
  const { user } = useCtx();

  const { data, isPending } = useQuery({
    queryKey: ["userWishlist"],
    queryFn: () => api({ endpoint: `tours/wishlist/${user?.id}` }),
  });

  if (isPending) {
    return (
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  return (
    <>
      {data?.tours?.length > 0 ? (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
          {data?.tours?.map((tour: Wishlists, i: number) => (
            <GridCard
              key={tour?.id}
              id={tour?.tour?.id}
              tourName={tour?.tour?.tourName}
              location={tour?.tour?.location}
              totalRatings={tour?.tour?.totalRatings}
              duration={tour?.tour?.duration}
              price={tour?.tour?.price}
              gallery={tour?.tour?.gallery}
              totalReviews={tour?.tour?.reviews?.length}
            />
          ))}
        </div>
      ) : (
        <Empty text="You have not added any tours to wishlist" />
      )}
    </>
  );
};

export default Wishlist;
