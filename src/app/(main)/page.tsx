import CardSkeleton from "@/components/common/loader/CardSkeleton";
import SectionHeading from "@/components/common/SectionHeading";
import AboutCompany from "@/components/home/AboutCompany";
import Activity from "@/components/home/Activity";
import FeaturedTours from "@/components/home/FeaturedTours";
import Hero from "@/components/home/Hero";
import TrendingDestinations from "@/components/home/TrendingDestinations";
import WhyUs from "@/components/home/WhyUs";
import React from "react";

const Page = () => {
  return (
    <>
      <Hero />
      <Activity />
      <section className="l-container py-10">
        <SectionHeading>Featured Tours</SectionHeading>
        <FeaturedTours />
      </section>
      <AboutCompany />
      <TrendingDestinations />
      <WhyUs />
    </>
  );
};

export default Page;
