import React from "react";
import Link from "next/link";

import UserNav from "./user-nav";
import MobileSidebar from "./mobile-sidebar";
import { ThemeToggle } from "./theme-toggle";

const Header = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-20 border-b bg-background/95 backdrop-blur">
      <nav className="flex items-center justify-between px-4 h-14">
        <div className="hidden lg:block">
          <Link href="/">
            <span className="text-bold">Dashboard</span>
          </Link>
        </div>

        <div className="block lg:!hidden">
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <UserNav />
        </div>
      </nav>
    </div>
  );
};

export default Header;
