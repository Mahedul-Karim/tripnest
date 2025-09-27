import React from "react";
import Title from "./Title";

interface Props {
  overview: string;
  highlight: string[];
}

const Overview: React.FC<Props> = ({ overview, highlight }) => {
  return (
    <div className="mt-12">
      <Title>Tour Overview</Title>
      <p className="text-navy text-sm !leading-[1.9] mt-4">
        {overview}
      </p>
      <div className="mt-4">
        <h4 className="text-navy font-medium text-base xs:text-lg">
          Tour Highlights
        </h4>
        <ul className="text-navy text-sm mt-4 list-disc flex flex-col gap-2 list-inside">
          {highlight?.map((high, i) => (
            <li key={i}>{high}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Overview;
