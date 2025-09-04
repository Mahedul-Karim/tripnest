import React from "react";
import Sidebar from "../common/nav/Sidebar";
import {
  CircleDollarSign,
  CirclePlus,
  ClipboardList,
  LayoutDashboard,
  Star,
  Ticket,
} from "lucide-react";

const NAV_LINKS = [
  {
    href: "/vendor",
    label: "Dashboard",
    icon: <LayoutDashboard className="size-5" />,
  },
  {
    href: "/vendor/listings",
    label: "Listings",
    icon: <ClipboardList className="size-5" />,
  },
  {
    href: "/vendor/add-listings",
    label: "Add Listings",
    icon: <CirclePlus className="size-5" />,
  },
  // {
  //   href: "/vendor/chats",
  //   label: "Chats",
  //   icon: <IoChatbubblesOutline className="text-xl" />,
  // },
  {
    href: "/vendor/bookings",
    label: "Bookings",
    icon: <Ticket className="size-5" />,
  },
  {
    href: "/vendor/earnings",
    label: "Earnings",
    icon: <CircleDollarSign className="size-5" />,
  },
  {
    href: "/vendor/reviews",
    label: "Reviews",
    icon: <Star className="size-5" />,
  },
];

interface Props {
  className?: string;
  onClick?: (val: boolean) => void;
}

const VendorNav: React.FC<Props> = ({ className, onClick }) => {
  return (
    <aside className={`${className}`}>
      <Sidebar navItems={NAV_LINKS} onClick={onClick} />
    </aside>
  );
};

export default VendorNav;
