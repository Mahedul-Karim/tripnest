import { Star } from "lucide-react";
import React from "react";

interface Props {
  totalReviews: number;
  label: number;
  value: number;
}

const ReviewBar: React.FC<Props> = ({ totalReviews, label, value }) => {
  return (
    <div className="flex items-center gap-2 text-muted xs:text-base text-sm">
      <p className="flex items-center gap-1 shrink-0">
        <span>{label}</span> <Star className="size-4" />
      </p>
      <div className="h-2.5 xs:h-3 rounded-md bg-primary-foreground relative overflow-clip  w-full xs:w-[60%] md:w-[40%]">
        <div
          className="absolute left-0 top-0 h-full bg-yellow-400 rounded-md"
          style={{
            width: `${Math.round((value / totalReviews) * 100)}%`,
          }}
        />
      </div>
      <p className="font-medium">{value}</p>
    </div>
  );
};

export default ReviewBar;
