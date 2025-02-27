"use client";

import { createContext, useCallback, useContext } from "react";
import { i18nKeys } from "./locales";
import { DEFAULT_LOCALE, getNestedValue, isSupportLocale, Locale, RESOURCES } from "./resources";

const LocaleContext = createContext<Locale>(DEFAULT_LOCALE);

type LocaleProviderProps = {
  children: React.ReactNode;
  locale: Locale;
};

export const LocaleProvider = ({ children, locale }: LocaleProviderProps) => {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
};

/**
 * クライアントサイドでの翻訳関数
 * @returns 翻訳関数
 */
export const useTranslation = (): {
  t: (key: i18nKeys, params?: Record<string, string>) => string;
} => {
  const currentLocale = useContext(LocaleContext);
  if (!isSupportLocale(currentLocale)) {
    throw new Error(`Unsupported locale: ${currentLocale}`);
  }

  const translate = useCallback(
    (key: i18nKeys, params?: Record<string, string>) => {
      const value = getNestedValue(RESOURCES[currentLocale], key);
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
    [currentLocale],
  );

  return { t: translate };
};
