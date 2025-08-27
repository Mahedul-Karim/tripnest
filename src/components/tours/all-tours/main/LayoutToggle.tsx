import { Button } from "@/components/ui/button";
import { LayoutPanelLeft, List } from "lucide-react";
import React from "react";

interface Props {
  type: string;
  setType?: (str: string) => void;
}

const LayoutToggle: React.FC<Props> = ({ type, setType }) => {
  return (
    <div className="flex items-center border border-solid gap-1 p-1 bg-primary/10 border-border rounded-md">
      <Button
        className={`rounded-md 
            ${
              type === "grid"
                ? "bg-primary text-white hover:bg-primary hover:text-white"
                : "bg-transparent text-text hover:bg-transparent hover:text-text"
            } size-7 transition-none`}
        size={"icon"}
        onClick={() => setType && setType("grid")}
      >
        <LayoutPanelLeft  />
      </Button>
      <Button
        className={`rounded-md 
            ${
              type === "list"
                ? "bg-primary text-white hover:bg-primary hover:text-white"
                : "bg-transparent text-text hover:bg-transparent hover:text-text"
            } size-7 transition-none`}
        size={"icon"}
        onClick={() => setType && setType("list")}
      >
        <List  />
      </Button>
    </div>
  );
};

export default LayoutToggle;
