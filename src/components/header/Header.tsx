"use client";

import { useCtx } from "@/context/Context";
import React, { useEffect, useRef } from "react";
import Logo from "../common/Logo";
import { usePathname } from "next/navigation";
import Nav from "./Nav";
import NavAction from "./NavAction";
import MobileNav from "./MobileNav";
import UserAvatar from "../common/UserAvatar";

const Header = () => {
  const pathname = usePathname();

  const headerRef = useRef<HTMLDivElement | null>(null);

  const { user } = useCtx();

  useEffect(() => {
    const stickyHeader = () => {
      if (window.scrollY > 70) {
        headerRef.current?.classList.add("sticky-header");
      } else {
        headerRef.current?.classList.remove("sticky-header");
      }
    };

    window.addEventListener("scroll", stickyHeader);

    return () => window.removeEventListener("scroll", stickyHeader);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 h-[70px] z-[2] w-full ${
        pathname !== "/" && "bg-white shadow-sm"
      }`}
      ref={headerRef}
    >
      <section className="l-container flex items-center justify-between h-full">
        <Logo />
        <div className="flex items-center gap-8">
          <div className="hidden md:block">
            <Nav />
          </div>
          <div className="flex items-center gap-4">
            {!user && (
              <div className="hidden md:block">
                <NavAction />
              </div>
            )}
            <MobileNav />
            {user && <UserAvatar />}
          </div>
        </div>
      </section>
    </header>
  );
};

export default Header;
