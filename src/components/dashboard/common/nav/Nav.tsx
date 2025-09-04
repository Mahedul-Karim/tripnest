import React from "react";
import NavLinks from "./NavLinks";

interface Props {
  navItems: {
    href: string;
    label: string;
    icon: React.ReactElement;
  }[];
  onClick?: (val: boolean) => void;
}

const Nav: React.FC<Props> = ({ navItems, onClick }) => {
  return (
    <nav>
      <ul className="flex flex-col">
        {navItems.map((nav, i) => (
          <NavLinks
            key={i}
            href={nav.href}
            label={nav.label}
            icon={nav.icon}
            onClick={onClick}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
