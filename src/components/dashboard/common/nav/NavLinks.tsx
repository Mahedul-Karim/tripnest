"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface Props {
  href: string;
  label: string;
  icon: React.ReactElement;
  onClick?: (val: boolean) => void;
}

const NavLinks: React.FC<Props> = ({ href, label, icon, onClick }) => {
  const pathname = usePathname();

  return (
    <li>
      <Link
        href={href}
        className={`flex items-center gap-2 py-3 rounded-md px-4 ${
          pathname === href
            ? "bg-primary text-white"
            : "bg-transparent text-muted"
        }`}
        onClick={() => {
          if (!onClick) return;
          onClick(false);
        }}
      >
        {icon}
        <span>{label}</span>
      </Link>
    </li>
  );
};

export default NavLinks;
