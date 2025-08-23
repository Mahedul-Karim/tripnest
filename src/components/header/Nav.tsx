import { NAV_DATA } from "@/lib/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Nav = () => {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex items-center gap-2">
        {NAV_DATA?.map((nav, i) => (
          <li key={i}>
            <Link
              href={nav.to}
              className={`font-medium text-sm px-4 py-2 relative before:absolute before:bottom-0 before:h-[1.6px] hover:before:w-[40%] before:transition-[width] before:duration-300 before:rounded-md before:bg-primary transition-colors hover:text-primary ${
                pathname === nav.to
                  ? "text-primary before:w-[40%]"
                  : "text-text before:w-0"
              }`}
            >
              {nav.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
