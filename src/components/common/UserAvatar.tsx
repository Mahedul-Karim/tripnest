"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCtx } from "@/context/Context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { LayoutDashboard, LogOut } from "lucide-react";
import { toast } from "sonner";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

const UserAvatar = () => {
  const { user, setUser, setIsLoggedIn, setToken } = useCtx();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsLoggedIn(false);
      setToken("");
      toast.success("Logged out successfully!");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-10 cursor-pointer">
          <AvatarImage src={user?.image?.url} />
          <AvatarFallback>
            {(user?.firstName?.[0] ?? "") + (user?.lastName?.[0] ?? "") || "?"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild className="gap-1 cursor-pointer">
          <Link href={"/user"}>
            <LayoutDashboard /> Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="w-full">
          <button onClick={handleLogout}>
            <LogOut /> LogOut
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
