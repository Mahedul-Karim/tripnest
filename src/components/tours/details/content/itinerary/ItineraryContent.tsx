import React from "react";

interface Props {
  index?: number;
  title: string;
  description: string;
}

const ItineraryContent: React.FC<Props> = ({ title, description, index }) => {
  return (
    <>
      {" "}
      <p className="text-navy text-sm xs:text-base font-medium max-w-[340px] text-center">Day {index}: {title}</p>
      <p className={`text-xs text-center xs:text-sm text-muted mt-[10px]`}>{description}</p>
    </>
  );
};

export default ItineraryContent;