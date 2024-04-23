import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

export type Locale = (typeof locales)[number]["code"];

export const locales = [
  { code: "en", name: "English" },
  { code: "pt", name: "Portuguese" },
] as const;

export const localeCodes = locales.map((locale) => locale.code);
export const defaultLocale = locales[1].code;

export default getRequestConfig(async ({ locale }) => {
  if (!localeCodes.includes(locale as Locale)) notFound();

  return {
    messages: (await import(`../i18n/${locale}.json`)).default,
  };
});
