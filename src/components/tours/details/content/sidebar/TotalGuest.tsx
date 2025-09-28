import { Minus, Plus } from "lucide-react";
import React from "react";

interface Props {
  label: string;
  guestNumber: number;
  onIncrease: () => void;
  onDecrese: () => void;
}

const TotalGuest: React.FC<Props> = ({
  label,
  guestNumber,
  onIncrease,
  onDecrese,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center text-[12px] xs:text-[13px] text-navy gap-1">
        <p>{label}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="size-[22px] xs:size-[25px] grid place-items-center border border-solid border-[#e7e6e6] text-[8px] xs:text-[10px] rounded-full cursor-pointer"
          onClick={onDecrese}
        >
          <Minus className="size-3" />
        </button>
        <p className="size-[22px] xs:size-[25px] text-xs xs:text-sm flex items-center justify-center">
          {guestNumber}
        </p>
        <button
          className="size-[22px] xs:size-[25px] grid place-items-center border border-solid border-[#e7e6e6] text-[8px] xs:text-[10px] rounded-full cursor-pointer"
          onClick={onIncrease}
        >
          <Plus className="size-3" />
        </button>
      </div>
    </div>
  );
};

export default TotalGuest;