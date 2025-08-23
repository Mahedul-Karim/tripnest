"use client";

import { useCtx } from "@/context/Context";
import React, { useEffect, useRef } from "react";
import Logo from "../common/Logo";
import { usePathname } from "next/navigation";

const Header = () => {

    const pathname = usePathname();

  const headerRef = useRef<HTMLDivElement | null>(null);

  const { user, isLoggedIn } = useCtx();

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
    <header className={`fixed top-0 left-0 h-[70px] z-[2] w-full ${
        pathname !== "/" && "bg-white shadow-sm"
      }`}>
      <section className="l-container flex items-center justify-between h-full">
        <Logo />
        <nav>Nav<div>Nav Action</div></nav>
        
      </section>
    </header>
  );
};

export default Header;
