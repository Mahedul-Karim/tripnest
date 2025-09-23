"use client";
import { Star } from "lucide-react";
import React, { memo } from "react";

interface Props {
  label: string;
  value: number;
  setValue: (val: number) => void;
}

const StarRating: React.FC<Props> = ({ label, value, setValue }) => {
  return (
    <div className="flex items-center gap-2">
      <p className="text-muted text-xs xs:text-sm">{label}:</p>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((rat) => (
          <span key={rat} onClick={() => setValue(rat)}>
            <Star
              className={`${
                rat <= value
                  ? "stroke-yellow-500 fill-yellow-500"
                  : "stroke-gray-300 fill-gray-300"
              } cursor-pointer size-4`}
            />
          </span>
        ))}
      </div>
    </div>
  );
};

export default memo(StarRating);
