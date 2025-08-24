import { createEnv } from "@t3-oss/env-nextjs";
import * as v from "valibot";

/**
 * 検証済み環境変数
 */
export const env = createEnv({
  server: {
    GMAIL_ADDRESS: v.pipe(v.string(), v.email()),
    GMAIL_PASSWORD: v.string(),
  },
  client: {},
  shared: {
    NODE_ENV: v.union([v.literal("development"), v.literal("production"), v.literal("test")]),
    GA_ID: v.string(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    GMAIL_ADDRESS: process.env.GMAIL_ADDRESS,
    GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
    GA_ID: process.env.GA_ID,
  },
});
