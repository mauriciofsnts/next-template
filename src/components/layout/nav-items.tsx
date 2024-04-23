"use client";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Megaphone,
  Settings,
  SquareUser,
  UserCog,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

export type NavItem = {
  title: string;
  href: string;
  Icon: React.ReactNode;
  label: string;
};

const iconClasses = "mr-2 h-4 w-4";

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    Icon: <LayoutDashboard className={iconClasses} />,
    label: "Dashboard",
  },
  {
    title: "Template",
    href: "/dashboard/template",
    Icon: <Megaphone className={iconClasses} />,
    label: "template",
  },
  {
    title: "Team",
    href: "/dashboard/team",
    Icon: <SquareUser className={iconClasses} />,
    label: "team",
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    Icon: <UserCog className={iconClasses} />,
    label: "profile",
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    Icon: <Settings className={iconClasses} />,
    label: "settings",
  },
];

interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

const DashboardNav: React.FC<DashboardNavProps> = ({ items, setOpen }) => {
  const pathName = usePathname();

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, i) => {
        const Icon = item.Icon;
        return (
          <Link
            key={i}
            href={item.href}
            onClick={() => {
              if (setOpen) setOpen(false);
            }}
          >
            <span
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm font-medium",
                pathName === item.href ? "bg-accent" : "bg-transparent"
              )}
            >
              {Icon}
              <span>{item.title}</span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default DashboardNav;
