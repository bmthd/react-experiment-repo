import * as R from "remeda";
import en from "./locales/en.json";
import ja from "./locales/ja.json";

export const RESOURCES = { ja, en };
export const SUPPORTED_LOCALES = R.keys(RESOURCES);
export const DEFAULT_LOCALE = "ja";

export type Locale = keyof typeof RESOURCES;

export const isSupportLocale = (locale: string | undefined): locale is Locale =>
  locale !== undefined && Object.keys(RESOURCES).includes(locale);

/**
 * ネストしたオブジェクトから値を取得する関数
 * @param obj ネストしたオブジェクト
 * @param path キーのパス
 * @returns 値
 */
export const getNestedValue = (obj: Record<string, any>, path: string): string => {
  return path.split(".").reduce<any>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return acc[key];
    }
    return path;
  }, obj);
};
