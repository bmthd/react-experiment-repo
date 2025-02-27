type JSONKey = string | number;

type Join<K extends JSONKey, P extends JSONKey> = `${K}.${P}`;

type Paths<T extends object> = {
  [K in keyof T]: K extends JSONKey ? (T[K] extends object ? Join<K, Paths<T[K]>> : K) : never;
}[keyof T];

import ja from "./ja.json";
export type i18nKeys = Paths<typeof ja>;
