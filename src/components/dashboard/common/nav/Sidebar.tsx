import Logo from "@/components/common/Logo";
import React from "react";
import Nav from "./Nav";

interface Props {
  navItems: {
    href: string;
    label: string;
    icon: React.ReactElement;
  }[];
  onClick?:(val:boolean)=>void;
}

const Sidebar: React.FC<Props> = ({ navItems,onClick }) => {
  return (
    <div className="bg-white border-r border-solid border-border p-6 w-[250px] xs:w-[270px] md:w-full h-screen md:h-full overflow-auto showScrollbar">
      <div className="flex items-center justify-center">
        <Logo />
      </div>
      <div className="my-6 border-t border-dashed border-border" />
      <Nav navItems={navItems} onClick={onClick}/>
    </div>
  );
};

export default Sidebar;