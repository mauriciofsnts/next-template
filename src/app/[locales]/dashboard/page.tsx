import LocaleSwitcher from "@/components/language-switcher";
import { useTranslations } from "next-intl";
import BearComponent from "./(components)/bear";
import Abilities from "./(components)/abilities";

export default function Home() {
  const t = useTranslations("global");

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <span>if you are seeing this page, it means you are logged in</span>
      <div>
        <LocaleSwitcher />
      </div>
      <h1 className="text-lg text-red-500">{t("hello")}</h1>
      <BearComponent />
      <Abilities />
    </main>
  );
}
