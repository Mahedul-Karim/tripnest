"use client";

import useSearchQuery from "@/hooks/useSearchQuery";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import CheckMark from "./CheckMark";

interface Props {
  title: string;
  filters?: {
    [key: string]: string;
  }[];
  isPrice?: boolean;
  field: string;
  inputName?: string;
}

let timeout: any;

const CheckFilter: React.FC<Props> = ({
  title,
  filters,
  isPrice = false,
  field,
}) => {
  const [rangeValue, setRangeValue] = useState<number[]>([0, 10000]);

  const searchParams = useSearchParams();

  const query = searchParams.get(field) || "";

  const { setSearchQuery, deleteSearchQuery } = useSearchQuery();

  const handleSearchQuery = (value: string, checked: boolean) => {
    if (!checked) {
      deleteSearchQuery(field);
      return;
    }

    setSearchQuery(field, value);
  };

  return (
    <div className="py-4">
      <h2 className="font-medium text-navy">{title}</h2>
      <div className="mt-4 flex flex-col gap-3">
        {isPrice
          ? ""
          : filters?.map((filt, i) => (
              <CheckMark
                key={i}
                label={filt.label}
                value={filt.value}
                index={i}
                onChange={handleSearchQuery}
                checked={query == filt.value}
              />
            ))}
      </div>
    </div>
  );
};

export default CheckFilter;
