import React, { useEffect, useState } from "react";
import { Search as SearchIcon } from "lucide-react";

import { useSearchParams } from "next/navigation";

import useSearchQuery from "@/hooks/useSearchQuery";
import { Input } from "@/components/ui/input";

const Search = () => {
  const search = useSearchParams().get("search") || "";

  const [searchText, setSearchText] = useState(search);

  const { setSearchQuery, deleteSearchQuery } = useSearchQuery();

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (!searchText) {
        deleteSearchQuery("search");
      } else {
        setSearchQuery("search", searchText);
      }
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchText]);

  return (
    <div className="flex items-center bg-primary/10 border-border border border-solid rounded-md h-full grow sm:grow-0 pr-1">
      <Input
        type="text"
        placeholder="Search Tours..."
        className="bg-transparent placeholder:text-xs sm:placeholder:text-sm shadow-none text-xs xs:text-sm grow border-none"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <SearchIcon className="text-xl text-muted" />
    </div>
  );
};

export default Search;
