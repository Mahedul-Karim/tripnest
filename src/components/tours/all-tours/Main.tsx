"use client";

import React, { Suspense, useState } from "react";
import LayoutToggle from "./main/LayoutToggle";
import Search from "./main/Search";

const Main = () => {
  const [type, setType] = useState("grid");

  return (
    <>
      <div className="flex sm:flex-row-reverse items-center">
        <div className="flex items-center gap-2 xs:gap-4 w-full sm:w-auto">
          <LayoutToggle type={type} setType={setType} />
          <Suspense fallback={<></>}>
            <Search />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default Main;
