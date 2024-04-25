type Messages = typeof import("./i18n/en.json");
declare interface IntlMessages extends Messages {}

type MenuKeys = keyof typeof import("./i18n/en.json")["menu"];
