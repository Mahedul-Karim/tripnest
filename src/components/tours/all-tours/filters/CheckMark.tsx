"use client";

import Ratings from "@/components/common/Ratings";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import React from "react";

interface Props {
  label: string;
  value: string | number;
  index: number;
  isRating?: boolean;
  onChange: any;
  checked?: boolean;
}

const CheckMark: React.FC<Props> = ({
  label,
  value,
  index,
  isRating = false,
  onChange,
  checked,
}) => {
  return (
    <div className="flex items-center gap-2 relative">
      <Checkbox
        id={`${value}-${index}`}
        value={value}
        onCheckedChange={(val) => onChange(value, val)}
        checked={checked}
        className={`cursor-pointer size-4.5 [&>svg]:size-4 rounded-full border-text/40 data-[state=checked]:bg-transparent dark:data-[state=checked]:bg-transparent data-[state=checked]:border-primary [&>svg]:stroke-primary`}
      />
      <Label htmlFor={`${value}-${index}`} className="font-normal text-text cursor-pointer">
        {!isRating ? label : <Ratings rating={Number(value)} size="size-4.5" />}
      </Label>
    </div>
  );
};

export default CheckMark;
