import * as v from "valibot";
import { createEnv } from "valibot-env/nextjs";

/**
 * 検証済み環境変数
 * @see https://zenn.dev/chot/articles/abount-valibot-env
 */
export const env = createEnv({
  schema: {
    public: {},
    private: {
      GMAIL_ADDRESS: v.pipe(v.string(), v.email()),
      GMAIL_PASSWORD: v.string(),
    },
    shared: {
      NODE_ENV: v.union([v.literal("development"), v.literal("production"), v.literal("test")]),
      GA_ID: v.string(),
    },
  },
  values: {
    NODE_ENV: process.env.NODE_ENV,
    GMAIL_ADDRESS: process.env.GMAIL_ADDRESS,
    GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
    GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  },
});
