import React from "react";
import Sidebar from "../common/nav/Sidebar";
import {
  CircleDollarSign,
  ClipboardList,
  LayoutDashboard,
  Star,
  Ticket,
  UserRoundCog,
  UsersRound,
} from "lucide-react";

const NAV_LINKS = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: <LayoutDashboard className="size-5" />,
  },
  {
    href: "/admin/all-listings",
    label: "Listings",
    icon: <ClipboardList className="size-5" />,
  },

  {
    href: "/admin/all-bookings",
    label: "Bookings",
    icon: <Ticket className="size-5" />,
  },
  {
    href: "/admin/earnings",
    label: "Earnings",
    icon: <CircleDollarSign className="size-5" />,
  },
  {
    href: "/admin/users",
    label: "Users",
    icon: <UsersRound className="size-5" />,
  },
  {
    href: "/admin/vendors",
    label: "Vendors",
    icon: <UserRoundCog className="size-5" />,
  },
  {
    href: "/admin/all-reviews",
    label: "Reviews",
    icon: <Star className="size-5" />,
  },
];

interface Props {
  className?: string;
  onClick?: (val: boolean) => void;
}

const AdminNav: React.FC<Props> = ({ className, onClick }) => {
  return (
    <aside className={`${className}`}>
      <Sidebar navItems={NAV_LINKS} onClick={onClick} />
    </aside>
  );
};

export default AdminNav;
