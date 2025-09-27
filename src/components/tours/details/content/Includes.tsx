import React from "react";
import Title from "./Title";
import { Check } from "lucide-react";

interface Props {
  includes: string[];
}

const Includes: React.FC<Props> = ({ includes }) => {
  return (
    <div>
      <Title>What&apos;s included</Title>
      <div className="mt-4 grid xs:grid-cols-2 gap-4 xs:gap-2">
        <div className="flex flex-col gap-4">
          {includes?.map((inc, i) => (
            <div className="flex gap-2" key={i}>
              <span className="size-[20px] flex items-center justify-center bg-green-100 text-green-500 rounded-full shrink-0">
                <Check className="size-4" />
              </span>
              <p className="text-navy text-sm">{inc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Includes;
