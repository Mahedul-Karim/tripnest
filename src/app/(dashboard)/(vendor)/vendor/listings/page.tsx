import Title from "@/components/dashboard/common/Title";
import AllListings from "@/components/dashboard/vendor/listings/AllListings";
import NewListings from "@/components/dashboard/vendor/listings/NewListings";
import React from "react";

const Page = () => {
  return (
    <>
      <div className="bg-foreground border border-border p-4 rounded-md">
        <div className="flex items-center justify-between">
          <Title>Listings</Title>
          <NewListings />
        </div>
        <AllListings />
      </div>
    </>
  );
};

export default Page;
