"use client";

import Empty from "@/components/common/Empty";
import { allUsers } from "@/lib/actions/admin";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import React from "react";
import UsersTable from "./UsersTable";

const AllUsers = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["adminAllUsers"],
    queryFn: async () => {
      const res = await allUsers("user");

      if (!res.success) throw new Error(res.message);

      return res;
    },
  });

  const users = data?.users || [];

  if (isPending) {
    return (
      <div className="mt-6 flex items-center justify-center h-full">
        <Loader className="size-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!isPending && error) {
    return (
      <div className="bg-white p-4 rounded-md border border-border mt-6">
        <Empty text={error.message} />
      </div>
    );
  }

  return (
    <div className="mt-6">
      {users.length === 0 ? (
        <Empty text="No users found" />
      ) : (
        <UsersTable data={users} />
      )}
    </div>
  );
};

export default AllUsers;
