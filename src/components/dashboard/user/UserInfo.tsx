"use client";
import React from "react";
import { useCtx } from "@/context/Context";

const UserInfo = () => {
  const { user } = useCtx();

  return (
    <div className="text-center mb-6 hidden md:block">
      <h2 className="text-navy text-2xl font-[500]">{`${user?.firstName} ${user?.lastName}`}</h2>
      <p className="text-muted">{user?.email}</p>
    </div>
  );
};

export default UserInfo;
