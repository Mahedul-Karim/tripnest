import React from "react";
import ItineraryContent from "./ItineraryContent";

interface Props {
  isRight?: boolean;
  index?: number;
  title: string;
  description: string;
}

const ItineraryItems: React.FC<Props> = ({
  isRight = false,
  index,
  title,
  description,
}) => {
  return (
    <div className="grid grid-cols-[1fr_20px_1fr] itineraryGrid gap-4">
      <div className="flex flex-col items-center">
        {!isRight && (
          <ItineraryContent
            title={title}
            description={description}
            index={index}
          />
        )}
      </div>
      <div className="relative dashedLine">
        <div className="size-[20px] border-2 border-solid border-primary rounded-full relative">
          <div
            className={`absolute top-[50%] -translate-y-[50%] w-[10px] xs:w-[30px] sm:w-[40px] border-t border-dashed border-primary ${
              !isRight
                ? "left-[-12px] xs:left-[-32px] sm:left-[-40px]"
                : "right-[-12px] xs:right-[-32px] sm:right-[-40px]"
            }`}
          />
        </div>
      </div>
      <div className="flex flex-col items-center">
        {isRight && (
          <ItineraryContent
            title={title}
            description={description}
            index={index}
          />
        )}
      </div>
    </div>
  );
};

export default ItineraryItems;