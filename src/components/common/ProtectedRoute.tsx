"use client";

import { useCtx } from "@/context/Context";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
  children: React.ReactNode;
  routeFor: Array<"admin" | "vendor" | "user" | "pending">;
}

const ProtectedRoute: React.FC<Props> = ({ children, routeFor = [] }) => {
  const { user, isLoggedIn, isLoading } = useCtx();

  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.replace("/login");
      return;
    }

    if (!isLoading && (user && !routeFor.includes(user.role))) {
      toast.error("You are not eligible to access this route");
      router.replace("/");
      return;
    }
  }, [isLoggedIn, isLoading]);

  if (isLoading) {
    return (
      <div className="bg-white h-screen grid place-items-center">
        <Loader className="size-12 animate-spin text-primary" />
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
