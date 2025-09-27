import { LucideIcon, Star } from "lucide-react";
import React from "react";

interface Props {
  Icon: LucideIcon;
  label: string;
  rating: number;
  isOverall?: boolean;
  length: number;
}

const REVIEW_TYPE: { [key: number]: string } = {
  1: "Very Poor",
  2: "Poor",
  3: "Average",
  4: "Good",
  5: "Excellent",
};

const RatingStats: React.FC<Props> = ({
  Icon,
  label,
  rating,
  isOverall = false,
  length,
}) => {
  const type = REVIEW_TYPE[Math.ceil(rating) || 1];

  return (
    <div
      className={`flex items-center justify-between p-2 xs:p-4`}
      style={{
        backgroundColor: isOverall
          ? "rgba(235, 102, 43, 0.1)"
          : "rgba(235, 102, 43, 0.04)",
      }}
    >
      <div className="flex items-center gap-2 xs:gap-4">
        <p>
          <Icon className="stroke-primary size-5 xs:size-6" />
        </p>
        <p className="flex flex-col">
          <span className="text-[12px] xs:text-[15px] text-navy font-medium">
            {label}
          </span>
          {length > 0 && (
            <span className="text-[10px] xs:text-[13px] text-navy">{type}</span>
          )}
        </p>
      </div>
      <div className="flex items-center gap-1 xs:gap-2">
        <span>
          <Star className="stroke-yellow-400 fill-yellow-400 size-3.5 xs:size-4" />
        </span>
        <span className="text-[12px] xs:text-[15px] text-navy font-medium">
          {rating}
        </span>
      </div>
    </div>
  );
};

export default RatingStats;
