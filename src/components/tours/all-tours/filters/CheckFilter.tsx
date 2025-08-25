"use client";

import useSearchQuery from "@/hooks/useSearchQuery";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

interface Props {
  title: String;
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
    <div>
      <h2>{title}</h2>
    </div>
  );
};

export default CheckFilter;
