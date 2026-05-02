import { LucideIcon } from "lucide-react";
import React from "react";

interface Props {
  Icon: LucideIcon;
  label: string;
  details: string;
}

const Badges: React.FC<Props> = ({ Icon, label, details }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-foreground border border-solid border-border rounded-lg p-2 text-navy">
        <Icon className="size-5 md:size-6" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-xs md:text-sm text-navy">{label}</p>
        <p className="text-[10px] md:text-xs text-muted">{details}</p>
      </div>
    </div>
  );
};

export default Badges;
