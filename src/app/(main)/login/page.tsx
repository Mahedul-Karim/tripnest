import LoginForm from "@/components/forms/LoginForm";
import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <div className="py-32 xs:py-40 grid place-items-center bg-white">
      <section className="l-container">
        <div className="grid sm:grid-cols-2">
          <div className="flex items-center justify-center">
            <LoginForm />
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
