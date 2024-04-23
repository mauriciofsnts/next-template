import React from "react";

import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";

function DashboardLayout({
  children,
}: Readonly<{ children?: React.ReactNode }>) {
  return (
    <>
      <Header />

      <div className="flex h-screen overflow-hidden">
        <Sidebar />

        <main className="w-full pt-14">{children}</main>
      </div>
    </>
  );
}

export default DashboardLayout;
