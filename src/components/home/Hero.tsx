import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div
      className={`min-h-screen bg-[url("/assets/bg.webp")] bg-no-repeat bg-cover`}
    >
      <section className="l-container pb-20 pt-28 sm:pt-36 gap-6 sm:gap-0 grid sm:grid-cols-[0.8fr_1fr]">
        <div className="flex flex-col  justify-center">
          <p className="text-sm text-muted">
            One site, 300,000+ experiences you&apos;ll remember
          </p>
          <h1 className="text-4xl xs:text-5xl lg:text-6xl text-navy font-bold !leading-[1.2] text-left relative z-[1]">
            Your
            <br className="hidden sm:inline-block" /> Adventure
            <br className="hidden sm:inline-block" /> Travel Experts
            <br className="hidden sm:inline-block" /> In World!
            <Image
              src="/assets/brush.svg"
              alt=""
              width={0}
              height={0}
              className="w-[150px] md:w-auto h-auto absolute bottom-0 left-[60px] z-[-1]"
            />
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <Image src="/assets/1.webp" alt="" width={340} height={420} />
            <Image src="/assets/2.webp" alt="" width={340} height={250} />
          </div>
          <Image
            src="/assets/3.webp"
            alt=""
            width={340}
            height={0}
            className="h-auto"
          />
        </div>
      </section>
    </div>
  );
};

export default Hero;
