"use client";

import { Button } from "@/components/ui/button";
import { useCtx } from "@/context/Context";
import { Moon, Sun } from "lucide-react";
import React from "react";

const DarkMode = () => {
  const { setDarkMode, darkMode } = useCtx();
  return (
    <Button
      size={"icon"}
      variant="ghost"
      onClick={() => setDarkMode((prev) => !prev)}
      className="text-navy dark:hover:bg-muted/5 dark:hover:text-navy"
    >
      {darkMode ? <Moon /> : <Sun />}
    </Button>
  );
};

export default DarkMode;
