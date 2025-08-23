import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={"/"} className="flex items-center gap-1">
      <Image
        width={42}
        height={40}
        src={"/assets/logo.svg"}
        alt="Site logo"
        priority
      />
      <p className="font-aladin text-2xl text-primary">TripNest</p>
    </Link>
  );
};

export default Logo;
