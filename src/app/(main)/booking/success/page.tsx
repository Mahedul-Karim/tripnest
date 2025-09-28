"use client";

import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import { toast } from "sonner";

const Page = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    toast.success("Tour booked successfully!");

    const animation = lottie.loadAnimation({
      container: containerRef.current as any,
      renderer: "svg",
      autoplay: true,
      path: "/success.json",
    });

    return () => {
      animation.destroy();
    };
  }, []);

  return (
    <section className="py-32 flex items-center justify-center l-container">
      <div ref={containerRef} className="size-[300px]"></div>
    </section>
  );
};

export default Page;
