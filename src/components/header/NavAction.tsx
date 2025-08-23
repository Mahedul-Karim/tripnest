import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const NavAction = () => {
  return (
    <Button className="md:rounded-full px-6 h-10" asChild>
      <Link href={"/login"}>Sign In</Link>
    </Button>
  );
};

export default NavAction;
