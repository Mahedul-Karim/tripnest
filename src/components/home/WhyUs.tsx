import React from "react";
import CheckItems from "../common/CheckItems";
import Image from "next/image";
import ListItem from "../common/ListItem";
import { BadgeDollarSign, Plane, ShieldCheck } from "lucide-react";

const WhyUs = () => {
  return (
    <section className="l-container py-10 grid md:grid-cols-[1fr_25%_1fr]">
      <div className="flex flex-col gap-3 justify-center">
        <h3 className="text-sm xs:text-lg sm:text-xl text-secondary font-medium">
          Why Choose Us
        </h3>
        <h2 className="text-lg xs:text-2xl sm:text-4xl font-bold text-text">
          Your Ultimate Tour Agency
        </h2>

        <p className="sm:text-base text-xs xs:text-sm text-muted">
          Choose us for an unparalleled travel experience tailored to your
          desires. With our commitment to excellence, extensive destination
          knowledge, and personalized service.
        </p>
        <div className="flex flex-col gap-4">
          <CheckItems>Personalized Service</CheckItems>
          <CheckItems>Destination Knowledge</CheckItems>
          <CheckItems>Hassle-Free Planning</CheckItems>
          <CheckItems>Customer Satisfaction Guaranteed</CheckItems>
        </div>
      </div>
      <div className="">
        <Image
          alt=""
          src="/assets/why.png"
          width={815}
          height={2063}
          className="w-full h-auto object-contain max-h-[250px] xs:max-h-[450px] md::max-h-[500px]"
        />
      </div>
      <div className="flex flex-col justify-center gap-4">
        <ListItem
          Icon={ShieldCheck}
          text="Share the core values and principles that drive your tourigo
                company. Emphasize a commitment to customer."
          heading="Excellent Security"
        />
        <ListItem
          Icon={BadgeDollarSign}
          text="Share the core values and principles that drive your tourigo
                company. Emphasize a commitment to customer."
          heading="Cost Efficiency"
        />
        <ListItem
          Icon={Plane}
          text="Share the core values and principles that drive your tourigo
                company. Emphasize a commitment to customer."
          heading="World Wide Route"
        />
      </div>
    </section>
  );
};

export default WhyUs;
