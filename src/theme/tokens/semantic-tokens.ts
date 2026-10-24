import { defineSemanticTokens } from "@yamada-ui/react";

/**
 * セマンティックトークンの定義
 */
export const semanticTokens = {
  colors: defineSemanticTokens.colors({
    accent: "indigo.900",
    background: "#ffffff",
    header: "#dae8fc",
    body: "#c6e2ff",
  }),
  colorSchemes: defineSemanticTokens.colorSchemes({
    primary: "blue",
    secondary: "violet",
    info: "blue",
    success: "green",
    warning: "orange",
    danger: "red",
    link: "blue",
  }),
};
