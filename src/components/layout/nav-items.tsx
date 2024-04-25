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
import { useTranslations } from "next-intl";

export type NavItem = {
  title: MenuKeys;
  href: string;
  Icon: React.ReactNode;
  label: string;
  children?: Omit<NavItem, "children" | "Icon">[];
};

const iconClasses = "mr-2 h-4 w-4";

export const navItems: NavItem[] = [
  {
    title: "dashboard",
    href: "/dashboard",
    Icon: <LayoutDashboard className={iconClasses} />,
    label: "Dashboard",
  },
  {
    title: "template",
    href: "/dashboard/template",
    Icon: <Megaphone className={iconClasses} />,
    label: "Template",
    children: [
      {
        title: "office",
        href: "/office",
        label: "Office",
      },
      {
        title: "home",
        href: "/home",
        label: "Home",
      },
    ],
  },
  {
    title: "team",
    href: "/dashboard/team",
    Icon: <SquareUser className={iconClasses} />,
    label: "Team",
  },
  {
    title: "profile",
    href: "/dashboard/profile",
    Icon: <UserCog className={iconClasses} />,
    label: "Profile",
  },
  {
    title: "settings",
    href: "/dashboard/settings",
    Icon: <Settings className={iconClasses} />,
    label: "Settings",
  },
];

interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

const DashboardNav: React.FC<DashboardNavProps> = ({ items, setOpen }) => {
  const t = useTranslations("menu");

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, i) => {
        const { Icon, title, children, href, label } = item;
        const hasChildren = children && children.length > 0;
        return (
          <div key={i}>
            {hasChildren ? (
              <Accordion type="single" collapsible>
                <AccordionItem value={title} className="border-b-0">
                  <AccordionTrigger
                    className={cn(
                      buttonVariants({ size: "sm", variant: "ghost" }),
                      "justify-between hover:no-underline"
                    )}
                  >
                    <div className="flex items-center justify-start">
                      {Icon}
                      {t(title)}
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
                          {t(child.title)}
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
                    "justify-start w-full"
                  )}
                >
                  {Icon}
                  {t(title)}
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
