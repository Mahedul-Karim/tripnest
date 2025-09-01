"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCtx } from "@/context/Context";
import {
  BookmarkCheck,
  Heart,
  ShieldCheck,
  ShieldUser,
  UserRound,
} from "lucide-react";

const navData = [
  {
    label: "Personal Info",
    Icon: <UserRound className="size-5" />,
    href: "/user",
  },
  {
    label: "Security",
    Icon: <ShieldCheck className="size-5" />,
    href: "/user/security",
  },
  // {
  //   label: "Chats",
  //   Icon: <IoChatbubbleOutline className="text-xl" />,
  //   href: "/user/chats",
  //   isChat: true,
  // },
  {
    href: "/admin",
  },
  {
    label: "My Bookings",
    Icon: <BookmarkCheck className="size-5" />,
    href: "/user/bookings",
  },
  {
    label: "My Wishlist",
    Icon: <Heart className="size-5" />,
    href: "/user/wishlist",
  },
];

const UserNav = () => {
  const pathname = usePathname();

  const { user } = useCtx();

  return (
    <>
      <div className="md:mb-6 w-full">
        <nav className="flex flex-row justify-around w-full md:flex-col gap-1 md:mt-2">
          {navData.map((nav, i) => {
            if (nav.href === "/admin" && user?.role === "admin") {
              return (
                <Link
                  href={"/admin"}
                  className={`flex items-center rounded-full md:rounded-md border-0 md:border  size-[30px] md:size-auto md:hover:border-primary md:hover:text-primary transition-colors duration-300 p-0 md:p-2 justify-center md:justify-between gap-2  ${
                    pathname === "/admin"
                      ? "bg-primary md:bg-transparent text-white  md:text-primary border-primary"
                      : "text-navy border-transparent"
                  } relative`}
                  key={i}
                >
                  <p className="flex items-center gap-2 relative">
                    <ShieldUser className="size-5" />
                    <span className="font-[500] text-[14px] hidden md:inline-block">
                      {" "}
                      {"Admin Dashboard"}
                    </span>
                  </p>
                </Link>
              );
            }
            if (nav.href !== "/admin") {
              return (
                <Link
                  href={nav.href}
                  className={`flex items-center rounded-full md:rounded-md size-[30px] border-0 md:border p-0 md:p-2 md:hover:border-primary md:hover:text-primary transition-colors duration-300 md:size-auto justify-center md:justify-between gap-2  ${
                    pathname === nav.href
                      ? "bg-primary md:bg-transparent text-white  md:text-primary border-primary"
                      : "text-navy border-transparent"
                  } relative`}
                  key={i}
                >
                  <p className="flex items-center gap-2 relative">
                    {nav.Icon}
                    <span className="font-[500] text-[14px] hidden md:inline-block">
                      {" "}
                      {nav.label}
                    </span>
                  </p>
                  {/* {nav.isChat && (
                    <span className="text-xs top-0 -right-[1px] md:text-sm text-white bg-primary size-[15px] md:size-[20px] flex items-center justify-center rounded-full absolute md:static">
                      2
                    </span>
                  )} */}
                </Link>
              );
            }
          })}
        </nav>
      </div>
    </>
  );
};

export default UserNav;
