import { Markdown } from "@yamada-ui/markdown";
import type { FC } from "@yamada-ui/react";
import fs from "node:fs";
import path from "node:path";
import "server-only";

export const getSourceCode = (file: string) => {
  const code = path.join(process.cwd(), file);
  return fs.readFileSync(code, "utf-8");
};

export const SourceCode: FC<{ code: string }> = ({ code }) => {
  const tsx = `\`\`\`tsx\n${code}\n\`\`\``;
  return <Markdown codeProps={{ theme: "vscDarkPlus" }}>{tsx}</Markdown>;
};
