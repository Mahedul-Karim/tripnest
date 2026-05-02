import Title from "@/components/dashboard/common/Title";
import AllBookings from "@/components/dashboard/vendor/bookings/AllBookings";
import React from "react";

const Page = () => {
  return (
    <>
      <div className="p-4 bg-card border-border border border-solid rounded-md">
        <Title>All Bookings</Title>
        <div className="mt-6">
          <AllBookings />
        </div>
      </div>
    </>
  );
};

export default Page;
