import AllListings from "@/components/dashboard/admin/all-listings/AllListings";
import Title from "@/components/dashboard/common/Title";
import React from "react";

const Page = () => {
  return (
    <div className="p-4 bg-card border-border border border-solid rounded-md">
      <Title>All Listings</Title>
      <AllListings />
    </div>
  );
};

export default Page;
