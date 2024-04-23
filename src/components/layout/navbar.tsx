import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="h-[72px] flex justify-between px-16 py-4 items-center fixed right-0 left-0 top-0 z-10">
      <span>Logo</span>

      <div className="flex items-center gap-9">
        <div className="flex flex-row gap-8">
          <span>Link one</span>
          <span>Link two</span>
          <span>Link three</span>
          <span>Link four</span>
        </div>

        <div className="flex items-center gap-3">
          <Link href='/login'>
            <Button variant="outline">Sign up</Button>
          </Link>
          <Button>Get started</Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
