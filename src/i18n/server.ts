import "server-only";

import { UserLocaleService } from "@/services/UserLocaleService";
import { i18nKeys } from "./locales";
import { getNestedValue, isSupportLocale, Locale, RESOURCES } from "./resources";

/**
 * サーバーサイドでの翻訳関数
 * @param locale ロケール
 * @returns 翻訳関数
 */
export const getTranslation = async (
  selectedLocale?: Locale,
): Promise<{
  t: (key: i18nKeys, params?: Record<string, string>) => string;
}> => {
  const cookieLanguage = await UserLocaleService.getCookieLocale();
  const acceptLanguage = await UserLocaleService.getAcceptLanguageLocale();
  const locale = selectedLocale ?? cookieLanguage ?? acceptLanguage;

  if (!isSupportLocale(locale)) {
    throw new Error(`Unsupported locale: ${locale}`);
  }

  return {
    t: (key: i18nKeys, params?: Record<string, string>) => {
      const value = getNestedValue(RESOURCES[locale], key);
      if (value === undefined) {
        console.warn(`Missing translation for key: ${key}`);
        return key;
      }

      // パラメータを置換
      if (params) {
        return value.replace(/{{(.*?)}}/g, (match, p1) => params[p1] || match);
      }

      return value;
    },
  };
};
