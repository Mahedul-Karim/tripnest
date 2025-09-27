import React from "react";
import Badges from "./Badges";
import { Cake, Clock, Languages, UsersRound } from "lucide-react";
import Overview from "./Overview";
import Includes from "./Includes";
import Itinerary from "./itinerary/Itinerary";
import Reviews from "./reviews/Reviews";

interface Props {
  id: string;
  duration: string;
  groupSize: number;
  overview: string;
  highlight: string[];
  includes: string[];
  itinerarys: {
    title: string;
    description: string;
  }[];
  price: number;
  reviews: any;
  creatorId: string;
  totalRatings: number;
  overall: any;
}

//new RegExp('(\\d+)') for splitting the string with number
// string.match(/\d+/)[0] to get the first number from a string

const Main: React.FC<Props> = ({
  id,
  duration,
  groupSize,
  overview,
  highlight,
  includes,
  itinerarys,
  price,
  reviews,
  creatorId,
  totalRatings,
  overall,
}) => {
  return (
    <main className="mt-6 grid md:grid-cols-[1fr_0.4fr] gap-8">
      <section>
        <div className="grid grid-cols-2 gap-4 sm:gap-0 sm:grid-cols-4">
          <Badges Icon={Clock} label={"Duration"} details={duration} />
          <Badges
            Icon={UsersRound}
            label={"Group Size"}
            details={`${groupSize} People`}
          />
          <Badges Icon={Cake} label={"Age"} details={"1-99"} />
          <Badges Icon={Languages} label={"Languages"} details={"English"} />
        </div>
        <Overview overview={overview} highlight={highlight} />
        <div className="border-t border-solid border-border my-12" />
        <Includes includes={includes} />
        <div className="border-t border-solid border-border my-12" />
        <Itinerary itinerarys={itinerarys} />
        <div className="border-t border-solid border-border my-12" />
        <Reviews
          reviews={reviews}
          totalRatings={totalRatings}
          overall={overall}
        />
      </section>
      <section></section>
    </main>
  );
};

export default Main;
