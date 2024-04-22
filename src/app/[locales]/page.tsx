import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("global");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-lg text-red-500">{t("hello")}</h1>
    </main>
  );
}
