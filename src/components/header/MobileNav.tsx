import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import Hamburger from "../common/nav/Hamburger";
import NavAction from "./NavAction";
import Logo from "../common/Logo";
import { NAV_DATA } from "@/lib/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCtx } from "@/context/Context";

const MobileNav = () => {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  const { user } = useCtx();

  return (
    <div className="block md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <Hamburger open={open} setOpen={setOpen} />
        <SheetContent
          side="left"
          className="bg-card border-border overflow-auto"
        >
          <SheetHeader className="border-b border-border py-2 flex items-center justify-center">
            <SheetTitle className="sr-only">
              Are you absolutely sure?
            </SheetTitle>
            <SheetDescription className="sr-only">
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
            <Logo />
          </SheetHeader>
          <nav className="px-4">
            <ul className="flex flex-col gap-2">
              {NAV_DATA?.map((nav, i) => (
                <li key={i}>
                  <SheetClose asChild>
                    <Link
                      href={nav.to}
                      className={`flex items-center justify-center rounded-md py-2 ${
                        nav.to === pathname
                          ? "border-primary text-primary"
                          : "border-transparent text-text"
                      } border`}
                    >
                      {nav.label}
                    </Link>
                  </SheetClose>
                </li>
              ))}
            </ul>
          </nav>
          <SheetFooter className="border-t border-border pt-2">
            {!user && (
              <SheetClose asChild>
                <NavAction />
              </SheetClose>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
