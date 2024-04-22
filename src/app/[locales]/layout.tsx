import React from "react";
import { AbilityProvider } from "@/lib/guards/ability-provider";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AbilityProvider>{children}</AbilityProvider>;
}
