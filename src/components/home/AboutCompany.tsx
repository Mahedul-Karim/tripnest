import { Check } from "lucide-react";
import Image from "next/image";
import React from "react";
import AnimatedButton from "../common/AnimatedButton";

const AboutCompany = () => {
  return (
    <section className="bg-primary-foreground">
      <div className="l-container py-10 sm:py-20 grid md:grid-cols-2 gap-6">
        <div className="relative">
          <div className="h-[250px] xs:h-[300px] sm:h-[400px] md:h-auto md:max-w-[476px] overflow-clip rounded-lg">
            <Image
              alt=""
              src="/assets/about1.png"
              width={690}
              height={790}
              className="h-auto w-full object-cover"
            />
          </div>
          <div className="hidden lg:block absolute overflow-clip top-[275px] right-[20px]">
            <Image
              alt=""
              src="/assets/about2.png"
              width={690}
              height={790}
              className="max-h-[333px] w-auto object-cover border-[8px] border-solid border-white rounded-lg"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 justify-center">
          <h3 className="text-sm xs:text-lg sm:text-xl text-secondary font-medium">
            About Our Company
          </h3>
          <p className="text-lg xs:text-2xl sm:text-4xl font-bold text-navy">
            Mapping Adventures, Making Moments
          </p>
          <p className="sm:text-base text-xs xs:text-sm text-muted">
            Share the core values and principles that drive your company.
            Emphasize a commitment to customer satisfaction, responsible
            tourism, or any unique approach you have towards travel.
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <p className="size-4 xs:size-6 bg-secondary flex items-center justify-center text-white rounded-full">
                <Check className="size-4.5" />{" "}
              </p>
              <p className="sm:text-base text-xs xs:text-sm text-text">
                Find Trips That Fit Your Flexible Lifestyle
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="size-4 xs:size-6 bg-secondary flex items-center justify-center text-white rounded-full">
                <Check className="size-4.5" />{" "}
              </p>
              <p className="sm:text-base text-xs xs:text-sm text-text">
                Expert-Guided Travel with Tourigo
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="size-4 xs:size-6 bg-secondary flex items-center justify-center text-white rounded-full">
                <Check className="size-4.5" />{" "}
              </p>
              <p className="sm:text-base text-xs xs:text-sm text-text">
                Discover the True Cost of Your Trip
              </p>
            </div>
          </div>
          <div className="self-start">
            <AnimatedButton href="/about-us">Know More</AnimatedButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCompany;
