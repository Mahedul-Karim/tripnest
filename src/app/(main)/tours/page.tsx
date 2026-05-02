import Main from "@/components/tours/all-tours/Main";
import Sidebar from "@/components/tours/all-tours/Sidebar";
import React, { Suspense } from "react";

const Page = () => {
  return (
    <section className="py-32 xs:py-40 grid md:grid-cols-[0.4fr_1fr] gap-6 l-container">
      <Sidebar />
      <main className="order-1 md:order-2 bg-foreground rounded-lg border border-solid border-border p-2 xs:p-4 min-h-[300px] md:min-h-[630px]">
        <Suspense fallback={<></>}>
          <Main />
        </Suspense>
      </main>
    </section>
  );
};

export default Page;
