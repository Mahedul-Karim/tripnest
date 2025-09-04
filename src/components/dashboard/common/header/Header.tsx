"use client";

import Link from "next/link";
import React from "react";
import MobileNav from "../nav/MobileNav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCtx } from "@/context/Context";

interface Props {
  isAdmin?: boolean;
}

const Header: React.FC<Props> = ({ isAdmin }) => {
  const { user } = useCtx();

  return (
    <header className="bg-white border-b border-solid border-border py-4">
      <section className="flex items-center justify-between l-container">
        <div>
          <MobileNav isAdmin={isAdmin} />
        </div>
        <div>
          <Link href="/user">
            <Avatar className="size-10">
              <AvatarImage src={user?.image?.url} />
              <AvatarFallback>
                {user && user?.firstName?.[0] + user?.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </section>
    </header>
  );
};

export default Header;
