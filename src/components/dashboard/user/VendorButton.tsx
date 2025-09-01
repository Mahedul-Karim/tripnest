"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useCtx } from "@/context/Context";
import { toast } from "sonner";
import LinearProgress from "@/components/common/loader/LinearProgress";
import { requestForVendor } from "@/lib/actions/user";
import { useMutation } from "@tanstack/react-query";

type Props = React.HTMLAttributes<HTMLDivElement>;

const VendorButton: React.FC<Props> = ({ className }) => {
  const router = useRouter();

  const { user, setUser } = useCtx();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const data = await requestForVendor(user?.email as string);

      if (!data.success) {
        throw new Error(data.message);
      }

      return data;
    },
    onSuccess: (data) => {
      //@ts-ignore
      setUser(data.user);
      toast.success("Vendor account created successfully!");
    },
    onError: (err: any) => {
      toast.error(err.message);
    },
  });

  const handleOnClick = async () => {
    if (user?.role === "pending") {
      toast.success("Your request in waiting for admin approval!");
      return;
    }

    if (user?.role === "vendor" || user?.role === "admin") {
      router.push("/vendor");
      return;
    }

    mutate();
  };
  return (
    <div className={`${className}`}>
      {isPending && <LinearProgress />}
      <Button
        type="button"
        className={`w-full bg-white hover:bg-white border-primary text-xs sm:text-sm sm:px-4 px-2 md:py-2 py-1 text-primary hover:text-primary disabled:border-disabled disabled:text-disabled`}
        variant={"outline"}
        onClick={handleOnClick}
        disabled={isPending}
      >
        {user?.role === "user" && "Become a vendor"}

        {(user?.role === "vendor" || user?.role === "admin") && "Dashboard"}
      </Button>
    </div>
  );
};

export default VendorButton;
