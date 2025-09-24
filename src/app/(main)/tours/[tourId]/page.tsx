import Details from "@/components/tours/details/Details";
import React from "react";

const Page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ tourId: string }>;
  searchParams: Promise<{ id: string }>;
}) => {
  const { tourId } = await params;
  const { id } = await searchParams;

  const tourName = decodeURIComponent(tourId).replace(/-/g, " ");

  return (
    <div className="pt-[70px]">
      <main className="l-container py-10">
        <Details tourName={tourName} id={id} />
      </main>
    </div>
  );
};

export default Page;
