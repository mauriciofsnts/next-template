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
import { buttonVariants } from "../ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export type NavItem = {
  title: string;
  href: string;
  Icon: React.ReactNode;
  label: string;
  children?: Omit<NavItem, "children" | "Icon">[];
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
    children: [
      {
        title: "Office",
        href: "/office",
        label: "office",
      },
      {
        title: "Home",
        href: "/home",
        label: "home",
      },
    ],
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
        const { Icon, title, children, href } = item;

        const hasChildren = children && children.length > 0;

        return (
          <div key={i}>
            {hasChildren ? (
              <Accordion type="single" collapsible>
                <AccordionItem value={title} className="border-b-0">
                  <AccordionTrigger
                    className={cn(
                      buttonVariants({ size: "sm", variant: "ghost" }),
                      "justify-between"
                    )}
                  >
                    <div className="flex items-center justify-start">
                      {Icon}
                      {title}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col space-y-1">
                      {children.map((child, index) => (
                        <Link
                          key={index}
                          href={child.href || "/"}
                          className={cn(
                            buttonVariants({ size: "sm", variant: "ghost" }),
                            "pl-5 justify-start"
                          )}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              href && (
                <Link
                  href={href}
                  className={cn(
                    buttonVariants({ size: "sm", variant: "ghost" }),
                    "justify-start"
                  )}
                >
                  {Icon}
                  {title}
                </Link>
              )
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default DashboardNav;
