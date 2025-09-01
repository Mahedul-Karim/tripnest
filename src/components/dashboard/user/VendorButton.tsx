"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useCtx } from "@/context/Context"; 
import { toast } from "sonner";
// import { requestForVendor } from "@/lib/actions/user";
import LinearProgress from "@/components/common/loader/LinearProgress";

type Props = React.HTMLAttributes<HTMLDivElement>;

const VendorButton: React.FC<Props> = ({ className }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const { user, setUser } = useCtx();

  const handleOnClick = async () => {
    if (user?.role === "pending") {
      toast.success("Your request in waiting for admin approval!");
      return;
    }

    if (user?.role === "vendor" || user?.role === "admin") {
      router.push("/vendor");
      return;
    }

    try {
      setIsLoading(true);

    //   const data = await requestForVendor(user?.email as string);

    //   if (!data.success) {
    //     throw new Error(data.message);
    //   }

    //   setUser(data.user);

      toast.success("Vendor account created successfully!");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={`${className}`}>
      {isLoading && <LinearProgress />}
      <Button
        type="button"
        className={`w-full bg-white hover:bg-white border-primary text-xs sm:text-sm sm:px-4 px-2 md:py-2 py-1 text-primary hover:text-primary disabled:border-disabled disabled:text-disabled`}
        variant={"outline"}
        onClick={handleOnClick}
        disabled={isLoading}
      >
        {user?.role === "user" && "Become a vendor"}

        {(user?.role === "vendor" || user?.role === "admin") && "Dashboard"}
      </Button>
    </div>
  );
};

export default VendorButton;
