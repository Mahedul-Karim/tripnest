import { LucideIcon } from "lucide-react";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  Icon: LucideIcon;
  label: string;
  value: string | number;
}

const StatsCard: React.FC<Props> = ({ Icon, label, value }) => {
  return (
    <Card className="shadow-none py-3 xs:py-4 border-border rounded-md">
      <CardContent className="px-3 xs:px-4 flex items-center gap-2">
        <div className="p-2 bg-primary/10 rounded-full">
          <Icon className="xs:size-7 text-primary" />
        </div>
        <div className="flex flex-col">
          <p className="text-muted text-xs xs:text-sm">{label}</p>
          <p className="text-sm xs:text-xl text-navy font-semibold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
