type Messages = typeof import("./i18n/en.json");
/**
 * Represents the interface for internationalized messages.
 * @interface
 * @extends Messages
 */
declare interface IntlMessages extends Messages {}

/**
 * Represents the keys of the menu object in the "en.json" file.
 */
type MenuKeys = keyof typeof import("./i18n/en.json")["menu"];
