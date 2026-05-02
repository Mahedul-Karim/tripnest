import AllVendors from "@/components/dashboard/admin/all-vendors/AllVendors";
import Title from "@/components/dashboard/common/Title";
import React from "react";

const Page = () => {
  return (
    <div className="p-4 bg-card border-border border border-solid rounded-md">
      <Title>All Vendors</Title>
      <AllVendors />
    </div>
  );
};

export default Page;
