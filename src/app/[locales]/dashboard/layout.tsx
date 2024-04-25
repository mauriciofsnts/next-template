"use client";
import { ReactNode } from "react";

import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { DEFALT_UNAUTHORIZED_REDIRECT } from "@/routes";

function DashboardLayout({ children }: Readonly<{ children?: ReactNode }>) {
  const routes = useRouter();
  const { status } = useSession();

  if (status === "unauthenticated") {
    return routes.push(DEFALT_UNAUTHORIZED_REDIRECT);
  }

  if (status === "loading") {
    return <div />;
  }

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
