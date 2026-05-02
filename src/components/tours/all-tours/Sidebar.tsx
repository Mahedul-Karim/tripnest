import { RATINGS, TOUR_DURATION, TOUR_TYPE } from "@/lib/data";
import React, { Suspense } from "react";
import CheckFilter from "./filters/CheckFilter";
import RatingFilter from "./filters/RatingFilter";

const Sidebar = () => {
  return (
    <aside className="py-4 px-6 bg-foreground rounded-xl border border-solid border-border order-2 md:order-1 h-max">
      <div className="flex flex-col gap-1">
        <Suspense fallback={<></>}>
          <CheckFilter title="Tour Type" filters={TOUR_TYPE} field="type" />
          <CheckFilter title="Filter Price" isPrice field="price" />
          <CheckFilter
            title="Duration"
            filters={TOUR_DURATION}
            field="duration"
          />
          <RatingFilter title="Rating" filters={RATINGS} />
        </Suspense>
      </div>
    </aside>
  );
};

export default Sidebar;
