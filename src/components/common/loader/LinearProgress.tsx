"use client";

import React from "react";
import { createPortal } from "react-dom";

const LinearProgress = () => {
  const progress = (
    <div className="h-1 fixed w-full top-0 left-0 z-[99999]">
      <div className="progress-bar-long left-0 right-[100%] top-0 bottom-0 absolute bg-primary rounded-md"></div>
      <div className="progress-bar-short left-0 right-[100%] top-0 bottom-0 absolute bg-primary rounded-md"></div>
    </div>
  );

  return createPortal(progress, document?.body);
};

export default LinearProgress;
