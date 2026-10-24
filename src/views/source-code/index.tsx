import { CodeBlock } from "@/ui/code-block";
import fs from "node:fs";
import path from "node:path";
import type { FC } from "react";
import "server-only";

export const getSourceCode = (file: string) => {
  const code = path.join(process.cwd(), file);
  return fs.readFileSync(code, "utf-8");
};

export const SourceCode: FC<{ code: string }> = ({ code }) => {
  return <CodeBlock code={code} language="tsx" />;
};
