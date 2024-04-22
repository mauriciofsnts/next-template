"use client";
import { locales } from "@/lib/locales";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();

  const switchLocale = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLocale = locales.find((loc) => loc.code === e.target.value);
    if (!selectedLocale) return;
    document.cookie = `NEXT_LOCALE=${selectedLocale?.code}; path=/; max-age=31536000; SameSite=Lax`;
    router.refresh();
  };

  return (
    <select
      value={locale}
      onChange={switchLocale}
      className="bg-white dark:bg-zinc-800 border outline-none border-gray-300 dark:border-zinc-900 text-gray-800 dark:text-white shadow-lg text-sm rounded-lg block w-full p-2"
    >
      {locales.map((loc) => (
        <option key={loc.code} value={loc.code}>
          {loc.name}
        </option>
      ))}
    </select>
  );
}
