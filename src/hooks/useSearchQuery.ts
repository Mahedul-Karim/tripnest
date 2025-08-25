import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const useSearchQuery = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const setSearchQuery = function (field: string, value: any) {
    const searchQuery = new URLSearchParams(searchParams);

    searchQuery.set(field, value);
    router.push(`${pathname}?${searchQuery.toString()}`, {
      scroll: false,
    });
  };

  const deleteSearchQuery = (field: string) => {
    const searchQuery = new URLSearchParams(searchParams);

    searchQuery.delete(field);

    router.push(`${pathname}?${searchQuery.toString()}`, {
      scroll: false,
    });
  };

  return { setSearchQuery, deleteSearchQuery };
};

export default useSearchQuery;
