"use client";

import { Checkbox } from "@/components/ui/checkbox";
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
      />
    </div>
  );
};

export default CheckMark;
