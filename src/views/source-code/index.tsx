import "server-only";

import { Markdown } from "@yamada-ui/markdown";
import { FC } from "@yamada-ui/react";
import fs from "fs";
import path from "path";

export const getSourceCode = (file: string) => {
  const code = path.join(process.cwd(), file);
  return fs.readFileSync(code, "utf-8");
};

export const SourceCode: FC<{ code: string }> = ({ code }) => {
  const tsx = `\`\`\`tsx\n${code}\n\`\`\``;
  return <Markdown codeProps={{ theme: "vscDarkPlus" }}>{tsx}</Markdown>;
};
