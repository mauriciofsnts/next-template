import React from "react";
import AuthProvider from "./auth-provider";
import IntlProvider from "./intl-provider";

interface Props {
  children: React.ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <AuthProvider>
      <IntlProvider>{children}</IntlProvider>
    </AuthProvider>
  );
};

export default Providers;
