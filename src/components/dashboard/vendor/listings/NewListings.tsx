"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

const NewListings = () => {
  return (
    <div>
      <Button
        asChild
        variant={"outline"}
        className="bg-white border-primary text-primary hover:text-primary"
      >
        <Link href={"/vendor/add-listings"}>
          <PlusCircle /> New Listing
        </Link>
      </Button>
    </div>
  );
};

export default NewListings;
