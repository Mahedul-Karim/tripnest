import Title from "@/components/dashboard/common/Title";
import InfoForm from "@/components/dashboard/user/info/InfoForm";
import UserImage from "@/components/dashboard/user/UserImage";
import React from "react";

const Page = () => {
  return (
    <div>
      <Title>Basic Info</Title>
      <div className="mt-4">
        <UserImage className="flex md:hidden w-28 h-28" />
        <InfoForm />
      </div>
    </div>
  );
};

export default Page;
