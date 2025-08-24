import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  children: React.ReactNode;
  href: string;
  invert?: boolean;
}

const AnimatedButton: React.FC<Props> = ({ children, href, invert }) => {
  return (
    <Link
      href={href}
      className={`px-7 text-xs xs:text-sm sm:text-base sm:px-[35px] rounded-full py-2 sm:py-3  text-white group overflow-clip relative z-[2] flex items-center ${
        invert ? "bg-primary" : "bg-secondary"
      }`}
    >
      <span className="absolute left-[20px] -translate-x-[200px] group-hover:translate-x-0 transition-all duration-500">
        <ArrowRight className="size-5" />
      </span>
      <span className="relative z-[1] -translate-x-[5px] group-hover:translate-x-[10px] transition-all duration-500">
        {children}
      </span>
      <span
        className={`absolute top-[50%] left-[50%] translate-x-[-50%] -translate-y-[50%] ${
          invert ? "bg-secondary" : "bg-primary"
        } w-[200px] h-[200px] z-[-1] scale-0 group-hover:scale-100 origin-center transition-all duration-500 rounded-full`}
      />
      <span className="absolute right-3 group-hover:translate-x-[200px] transition-all duration-500">
        <ArrowRight className="size-5" />
      </span>
    </Link>
  );
};

export default AnimatedButton;
