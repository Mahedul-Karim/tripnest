"use client";

import Empty from "@/components/common/Empty";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getSingleTour } from "@/lib/actions/tour";
import { useQuery } from "@tanstack/react-query";
import { House, Loader } from "lucide-react";
import Link from "next/link";
import React from "react";
import Heading from "./Heading";
import Gallery from "./Gallery";
import Main from "./content/Main";

const Details = ({ tourName, id }: { tourName: string; id: string }) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["tourDetails", id],
    queryFn: async () => {
      const res = await getSingleTour(id);

      if (!res.success) throw new Error(res.message);

      return res;
    },
  });

  const tour = data?.tour;
  const overall = data?.overall;

  if (isPending) {
    return (
      <div className="h-[80vh] grid place-items-center">
        <Loader className="size-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!isPending && error) {
    return (
      <div className="grid place-items-center">
        <Empty text={error.message} />
      </div>
    );
  }

  if (!isPending && !error && !tour) {
    <div className="grid place-items-center">
      <Empty text={"No tours found"} />
    </div>;
  }

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList className="text-muted text-xs gap-1 sm:gap-1.5">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={"/"} className="hover:text-muted">
                <House className="size-4" />
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/tours">Tours</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="capitalize line-clamp-1 text-muted">
              {tourName}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Heading
        id={id}
        name={tour!.tourName}
        totalRatings={tour!.totalRatings}
        location={tour!.location}
        totalReviews={tour!.reviews?.length}
      />
      <Gallery gallery={tour!.gallery} />
      <Main
        id={id}
        totalRatings={tour!.totalRatings}
        duration={tour!.duration}
        groupSize={tour!.groupSize}
        overview={tour!.overview}
        highlight={tour!.highlight}
        includes={tour!.includes}
        itinerarys={tour!.itinerarys}
        price={tour!.price}
        reviews={tour!.reviews}
        creatorId={tour!.creatorId}
        overall={overall}
      />
    </>
  );
};

export default Details;
