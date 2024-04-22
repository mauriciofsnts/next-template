import React from "react";
import AuthProvider from "./auth-provider";

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default Providers;
