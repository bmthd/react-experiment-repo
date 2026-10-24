import type { FC } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

/**
 * シンタックスハイライト付きのコードブロック
 */
export const CodeBlock: FC<{ code: string; language: string }> = ({ code, language }) => (
  <SyntaxHighlighter language={language} style={vscDarkPlus}>
    {code}
  </SyntaxHighlighter>
);
