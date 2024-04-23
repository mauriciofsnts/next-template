import { ReactNode } from "react";
import { NextIntlClientProvider, useMessages } from "next-intl";

interface Props {
  children: ReactNode;
}

export const IntlProvider = ({ children }: Props) => {
  const messages = useMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
};
