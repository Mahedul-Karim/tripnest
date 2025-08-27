"use client";

import React from "react";
import CheckMark from "./CheckMark";
import { useSearchParams } from "next/navigation";
import useSearchQuery from "@/hooks/useSearchQuery";

interface Props {
  title: string;
  filters?: {
    [key: string]: string | number;
  }[];
}

const RatingFilter: React.FC<Props> = ({ title, filters }) => {
  const searchParams = useSearchParams();

  const ratingQuery = searchParams.get("rating")
    ? searchParams
        .get("rating")!
        .split("-")
        .map((rat) => +rat)
    : [];

  const { setSearchQuery, deleteSearchQuery } = useSearchQuery();

  const handleSearchQuery = (value: any, checked: boolean) => {
    console.log(checked);

    if (ratingQuery.length === 1 && ratingQuery.includes(value)) {
      deleteSearchQuery("rating");
      return;
    }

    const ratingArray = !ratingQuery.includes(value)
      ? [...ratingQuery, value]
      : ratingQuery.filter((rat) => rat !== value);

    setSearchQuery("rating", ratingArray.join("-"));
  };

  return (
    <div className="py-4">
      <h2 className="font-medium text-navy">{title}</h2>
      <div className="mt-4 flex flex-col gap-3">
        {filters?.map((filter, index) => (
          <CheckMark
            key={index}
            checked={ratingQuery.includes(filter.value as number)}
            label={filter.label as string}
            value={filter.value}
            index={index}
            isRating
            onChange={handleSearchQuery}
          />
        ))}
      </div>
    </div>
  );
};

export default RatingFilter;
