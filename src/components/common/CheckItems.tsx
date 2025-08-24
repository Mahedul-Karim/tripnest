import { Check } from "lucide-react";
import React from "react";

const CheckItems = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center gap-2">
      <p className="size-4 xs:size-6 bg-secondary flex items-center justify-center text-white rounded-full">
        <Check className="size-4.5" />{" "}
      </p>
      <p className="sm:text-base text-xs xs:text-sm text-text">{children}</p>
    </div>
  );
};

export default CheckItems;
