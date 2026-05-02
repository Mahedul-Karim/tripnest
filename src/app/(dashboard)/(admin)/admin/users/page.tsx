import AllUsers from "@/components/dashboard/admin/all-users/AllUsers";
import Title from "@/components/dashboard/common/Title";
import React from "react";

const Page = () => {
  return (
    <div className="p-4 bg-card border-border border border-solid rounded-md">
      <Title>All Users</Title>
      <AllUsers />
    </div>
  );
};

export default Page;
