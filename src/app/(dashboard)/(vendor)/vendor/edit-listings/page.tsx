import Title from "@/components/dashboard/common/Title";
import ListingsForm from "@/components/dashboard/vendor/listings/ListingsForm";
import React from "react";

const Page = () => {
  return (
    <>
      <Title>Edit Tour</Title>
      <div className="max-w-[600px] w-full mt-6">
        <ListingsForm isEditing />
      </div>
    </>
  );
};

export default Page;
