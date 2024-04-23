"use client";

import { useSession } from "next-auth/react";

const Authentication = () => {
  const { data: session } = useSession();
  return (
    <span>
      {session?.user ? `Hello, ${session.user.name}` : "You are not logged in"}
    </span>
  );
};

export default Authentication;
