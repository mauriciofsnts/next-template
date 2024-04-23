import React from "react";
import AuthProvider from "./auth-provider";
import IntlProvider from "./intl-provider";
import { ReactQueryClientProvider } from "./react-query-client-provider";

interface Props {
  children: React.ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <ReactQueryClientProvider>
      <AuthProvider>
        <IntlProvider>{children}</IntlProvider>
      </AuthProvider>
    </ReactQueryClientProvider>
  );
};

export default Providers;
