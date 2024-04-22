import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { localeCodes } from "./lib/locales";

export default getRequestConfig(async ({ locale }) => {
  if (!localeCodes.includes(locale as any)) notFound();

  return {
    messages: (await import(`./i18n/${locale}.json`)).default,
  };
});
