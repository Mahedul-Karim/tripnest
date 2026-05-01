"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const NavAction = () => {
  return (
    <div className="flex items-center gap-4">
      <Button className="md:rounded-full px-6 h-10 font-semibold" asChild>
        <Link href={"/login"}>Sign In</Link>
      </Button>
    </div>
  );
};

export default NavAction;
