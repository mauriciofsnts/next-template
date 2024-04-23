"use client";
import React from "react";
import { useSession } from "next-auth/react";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session } = useSession();

  if (!session) {
    return <div>Unauthorized</div>;
  }

  return children;
}
