import { TOUR_DURATION, TOUR_TYPE } from "@/lib/data";
import React, { Suspense } from "react";
import CheckFilter from "./filters/CheckFilter";

const Sidebar = () => {
  return (
    <aside className="py-4 px-6 bg-white rounded-xl border border-solid border-border order-2 md:order-1 md:h-[630px]">
      <div className="flex flex-col gap-3">
        <Suspense fallback={<></>}>
          <CheckFilter title="Tour Type" filters={TOUR_TYPE} field="type" />
          <CheckFilter title="Filter Price" isPrice field="price" />
          <CheckFilter
            title="Duration"
            filters={TOUR_DURATION}
            field="duration"
          />
        </Suspense>
      </div>
    </aside>
  );
};

export default Sidebar;
