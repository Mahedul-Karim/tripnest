import Sidebar from "@/components/tours/all-tours/Sidebar";
import React from "react";

const Page = () => {
  return (
    <section className="py-32 xs:py-40 grid md:grid-cols-[0.4fr_1fr] gap-6 l-container">
      <Sidebar />
    </section>
  );
};

export default Page;
