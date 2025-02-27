import { Locale, SUPPORTED_LOCALES } from "@/i18n/resources";
import { cookies, headers } from "next/headers";

const COOKIE_KEY = "locale";

export namespace UserLocaleService {
  /**
   * Cookieからロケールを取得する
   * @returns ロケール
   */
  export const getCookieLocale = async (): Promise<Locale | undefined> => {
    const cookieStore = await cookies();
    const locale = cookieStore.get(COOKIE_KEY)?.value;
    return SUPPORTED_LOCALES.find((l) => l === locale);
  };

  /**
   * Accept-Languageヘッダーからロケールを取得する
   * @returns ロケール
   */
  export const getAcceptLanguageLocale = async (): Promise<Locale | undefined> => {
    const acceptLanguage = await headers().then((h) => h.get("Accept-Language"));
    if (!acceptLanguage) return undefined;
    const acceptedLanguages = acceptLanguage.split(",").map((lang) => lang.split(";")[0]?.trim());

    return SUPPORTED_LOCALES.find((locale) => acceptedLanguages.includes(locale));
  };
}
