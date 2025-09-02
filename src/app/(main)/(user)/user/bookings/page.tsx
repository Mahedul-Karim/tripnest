import Title from "@/components/dashboard/common/Title";
import Bookings from "@/components/dashboard/user/bookings/Bookings";
import React from "react";

const Page = () => {
  return (
    <>
      <Title>My Bookings</Title>
      <Bookings />
    </>
  );
};

export default Page;
