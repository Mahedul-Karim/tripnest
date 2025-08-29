"use client";

import React, { Suspense, useState } from "react";
import LayoutToggle from "./main/LayoutToggle";
import Search from "./main/Search";
import { useSearchParams } from "next/navigation";
import CardSkeleton from "@/components/common/loader/CardSkeleton";
import { useQuery } from "@tanstack/react-query";
import Empty from "@/components/common/Empty";
import { api } from "@/lib/utils";
import GridCard from "../GridCard";
import ListCard from "../ListCard";

const Main = () => {
  const [type, setType] = useState("grid");

  const searchParams = useSearchParams();

  const tourType = searchParams?.get("type") || "";
  const duration = searchParams?.get("duration") || "";
  const price = searchParams?.get("price") || "";
  const rating = searchParams?.get("rating") || "";
  const search = searchParams?.get("search") || "";

  const { data, isPending, error } = useQuery({
    queryKey: [`all-tours`, tourType, duration, price, rating, search],
    queryFn: () =>
      api({
        endpoint: `tours?type=${tourType}&duration=${duration}&price=${price}&rating=${rating}&search=${search}`,
      }),
    retry: false,
  });

  return (
    <>
      <div className="flex sm:flex-row-reverse items-center">
        <div className="flex items-center gap-2 xs:gap-4 w-full sm:w-auto">
          <LayoutToggle type={type} setType={setType} />
          <Suspense fallback={<></>}>
            <Search />
          </Suspense>
        </div>
      </div>
      <div className="mt-6">
        {(!data || isPending) && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 xs:gap-4 sm:gap-6">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        )}
        {(data?.tours?.length === 0 || error) && (
          <Empty text={error?.message || "No tours found"} />
        )}
        {data?.tours?.length > 0 &&
          (type === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 xs:gap-4 sm:gap-6">
              <Suspense fallback={<></>}>
                {data?.tours?.map((tour: AllToursType) => (
                  <GridCard
                    key={tour?.id}
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
          ) : (
            <div className="flex flex-col gap-4">
              {data?.tours?.map((tour:AllToursType) => (
                <ListCard
                  key={tour?.id}
                  id={tour?.id}
                  tourName={tour?.tourName}
                  location={tour?.location}
                  totalRatings={tour?.totalRatings}
                  duration={tour?.duration}
                  price={tour?.price}
                  gallery={tour?.gallery}
                  overview={tour?.overview}
                />
              ))}
            </div>
          ))}
      </div>
    </>
  );
};

export default Main;
