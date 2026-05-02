import React from "react";
import UserImage from "./UserImage";
import UserInfo from "./UserInfo";
import UserNav from "./UserNav";
import VendorButton from "./VendorButton";

const Sidebar = () => {
  return (
    <aside className="bg-card fixed md:static bottom-0 left-0 w-full md:w-auto md:h-[630px] md:rounded-xl px-3 py-2 md:py-4 flex items-center md:items-stretch md:justify-between flex-row md:flex-col gap-2 border border-solid border-border z-[5]">
      <div className="flex items-center md:justify-center w-full md:block gap-2">
        <UserImage className="hidden md:flex" />
        <UserInfo />
        <UserNav />
      </div>
      <VendorButton className="hidden md:block" />
    </aside>
  );
};

export default Sidebar;
