import CardSkeleton from "@/components/common/loader/CardSkeleton";
import SectionHeading from "@/components/common/SectionHeading";
import Activity from "@/components/home/Activity";
import FeaturedTours from "@/components/home/FeaturedTours";
import Hero from "@/components/home/Hero";
import React, { Suspense } from "react";

const Page = () => {
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

  return (
    <>
      <Hero />
      <Activity />
      <section className="l-container py-10">
        <SectionHeading>Featured Tours</SectionHeading>
        <Suspense fallback={featuredSuspense}>
          <FeaturedTours />
        </Suspense>
      </section>
    </>
  );
};

export default Page;
