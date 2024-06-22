"use client";
import { ReactNode } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { DEFALT_UNAUTHORIZED_REDIRECT } from "@/routes";
import { AbilityProvider } from "@/lib/guards/ability-provider";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";

function DashboardLayout({ children }: Readonly<{ children?: ReactNode }>) {
  const router = useRouter();
  const { status, data: session } = useSession();

  if (status === "loading") {
    return <div />;
  }

  if (status === "unauthenticated") {
    return router.push(DEFALT_UNAUTHORIZED_REDIRECT);
  }

  if (status === "authenticated")
    return (
      <AbilityProvider>
        <Header />

        <div className="flex h-screen overflow-hidden">
          <Sidebar />

          <main className="w-full pt-14 bg-backgroundForeground max-h-screen overflow-y-auto">
            {children}
          </main>
        </div>
      </AbilityProvider>
    );
}

export default DashboardLayout;
