import Title from "@/components/dashboard/common/Title";
import ListingsForm from "@/components/dashboard/vendor/listings/ListingsForm";
import React from "react";

const Page = () => {
  return (
    <>
      <Title>Add Tour</Title>
      <div className="max-w-150 w-full mt-6">
        <ListingsForm />
      </div>
    </>
  );
};

export default Page;
