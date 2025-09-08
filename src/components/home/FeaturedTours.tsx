"use client";

import React, { Suspense } from "react";
import Empty from "../common/Empty";
import GridCard from "../tours/GridCard";
import CardSkeleton from "../common/loader/CardSkeleton";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/utils";

const FeaturedTours = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["featured-tours"],
    queryFn: () => api({ endpoint: "tours/featured" }),
  });

  const tours = data?.tours || [];

  const featuredSuspense = (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 xs:gap-4 mt-6">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );

  if (!data || isPending) {
    return featuredSuspense;
  }

  if (error) {
    return (
      <div className="mt-6">
        <Empty text={error.message} />
      </div>
    );
  }

  return (
    <section className="mt-6">
      {tours.length === 0 ? (
        <Empty />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 xs:gap-4 mt-6">
          <Suspense fallback={<></>}>
            {tours.map((tour: AllToursType) => (
              <GridCard
                key={tour.id}
                id={tour?.id}
                tourName={tour?.tourName}
                location={tour?.location}
                totalRatings={tour?.totalRatings}
                duration={tour?.duration}
                price={tour?.price}
                gallery={tour?.gallery}
                totalReviews={tour?.reviews?.length}
              />
            ))}
          </Suspense>
        </div>
      )}
    </section>
  );
};

export default FeaturedTours;
