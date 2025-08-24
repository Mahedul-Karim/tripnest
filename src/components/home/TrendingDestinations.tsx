import React from "react";
import SectionHeading from "../common/SectionHeading";
import Image from "next/image";
export const TRENDING_DATA = [
  {
    src: "/assets/trending1.webp",
    styles: "sm:col-start-1 sm:col-end-4 rounded-lg overflow-clip",
    title: "Paris",
  },
  {
    src: "/assets/trending2.webp",
    styles: "sm:col-start-4 sm:col-end-9 rounded-lg overflow-clip",
    title: "Thailand",
  },
  {
    src: "/assets/trending3.webp",
    styles:
      "col-start-1 col-end-3  sm:col-start-9 sm:row-span-full sm:col-end-13 rounded-lg overflow-clip",
    title: "Italy",
  },
  {
    src: "/assets/trending4.webp",
    styles:
      "col-start-1 col-end-3 sm:col-start-1 sm:col-end-4 rounded-lg overflow-clip",
    title: "Museum",
  },
  {
    src: "/assets/trending5.webp",
    styles: "sm:col-start-4 sm:col-end-6 rounded-lg overflow-clip",
    title: "Japan",
  },
  {
    src: "/assets/trending6.webp",
    styles: "sm:col-start-6 sm:col-end-9 rounded-lg overflow-clip",
    title: "Greece",
  },
];

const TrendingDestinations = () => {
  return (
    <section className="l-container py-10 sm:py-20">
      <SectionHeading>Trending Destinations</SectionHeading>
      <div className="grid grid-cols-2 sm:grid-cols-12 gap-4 grid-rows-[150px_200px_200px_150px] mt-8 sm:grid-rows-2">
        {TRENDING_DATA.map((data, i) => (
          <div
            className={`${data.styles} relative after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-[#05073c]/[0.3] after:z-[1] group`}
            key={i}
          >
            <Image
              src={data.src}
              alt=""
              width={780}
              height={780}
              style={{
                objectFit: "cover",
                height: "100%",
              }}
              className="transition-all duration-500 group-hover:scale-[1.15]"
            />
            <div className="absolute top-0 left-0 w-full h-full flex flex-col-reverse z-[2] items-center">
              <div className="pb-2 xs:pb-4 text-white flex flex-col items-center">
                <p className="text-xs sm:text-base font-bold">{data.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingDestinations;
