import SignUpForm from "@/components/forms/SignUpForm";
import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <div className="py-32 xs:py-40 grid place-items-center bg-foreground">
      <section className="l-container">
        <div className="grid sm:grid-cols-2">
          <div className="flex items-center justify-center">
            <SignUpForm />
          </div>
          <div className="hidden sm:block">
            <Image alt="" src={"/assets/login.png"} width={500} height={250} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
