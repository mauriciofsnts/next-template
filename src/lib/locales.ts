export const locales = [
  { code: "en", name: "English" },
  { code: "pt", name: "Portuguese" },
] as const;

export type Locale = (typeof locales)[number]["code"];

export const localeCodes = locales.map((locale) => locale.code);

export const defaultLocale = locales[0].code;
