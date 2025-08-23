import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-16 l-container">
      <div>
        <img src="/404.png" alt="" className="max-h-[350px]" />
      </div>
      <p className="my-4 text-center text-muted text-sm xs:text-base">
        Oops! The page you&apos;re looking for might be under construction or
        doesn&apos;t exist.
      </p>
      <div className="flex items-center justify-center">
        <Button asChild className={"rounded-full font-semibold"}>
          <Link href={"/"}>Back to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
