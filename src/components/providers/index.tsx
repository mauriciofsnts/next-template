import { ReactNode } from "react";
import { AuthProvider } from "./auth-provider";
import { IntlProvider } from "./intl-provider";
import { ReactQueryClientProvider } from "./react-query-client-provider";
import { ThemeProvider } from "./theme-provider";

interface Props {
  children: ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <ReactQueryClientProvider>
      <ThemeProvider>
        <AuthProvider>
          <IntlProvider>{children}</IntlProvider>
        </AuthProvider>
      </ThemeProvider>
    </ReactQueryClientProvider>
  );
};

export default Providers;
