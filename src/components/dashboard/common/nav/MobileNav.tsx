"use client";

import React, { useState } from "react";
import VendorNav from "../../vendor/VendorNav";
import AdminNav from "../../admin/AdminNav";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Hamburger from "@/components/common/nav/Hamburger";

interface Props {
  isAdmin?: boolean;
}

const MobileNav: React.FC<Props> = ({ isAdmin }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden block">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Hamburger open={open} setOpen={setOpen} />
        </SheetTrigger>
        <SheetContent
          side="right"
          className="bg-white border-border"
        >
          <SheetHeader className="p-0">
            <SheetTitle className="sr-only">
              Are you absolutely sure?
            </SheetTitle>
            <SheetDescription className="sr-only">
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
          {isAdmin ? (
            <AdminNav
              className={`md:hidden block w-full [&>div]:w-full [&>div]:pt-0`}
              onClick={setOpen}
            />
          ) : (
            <VendorNav
              className={`md:hidden block w-full [&>div]:w-full [&>div]:pt-0`}
              onClick={setOpen}
            />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
