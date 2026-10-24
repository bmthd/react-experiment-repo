import { CodeBlock } from "@/ui/code-block";
import type { FC } from "react";

export const JSONViewer: FC<{ value: unknown }> = ({ value }) => {
  return <CodeBlock code={JSON.stringify(value, null, 2)} language="json" />;
};
