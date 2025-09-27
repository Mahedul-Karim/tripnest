import React from "react";
import Title from "../Title";
import ItineraryItems from "./ItineraryItem";

interface Props {
  itinerarys: {
    title: string;
    description: string;
  }[];
}

const Itinerary: React.FC<Props> = ({ itinerarys }) => {
  return (
    <div>
      <Title>Itinerary</Title>
      <div className="mt-4 flex flex-col gap-16">
        {itinerarys?.map((iti, i) => (
          <ItineraryItems
            isRight={!(i % 2) ? true : false}
            key={i}
            title={iti.title}
            description={iti.description}
            index={i + 1}
          />
        ))}
      </div>
    </div>
  );
};

export default Itinerary;
