import { type ComponentStyle, type TagProps } from "@yamada-ui/react";

/**
 * タグコンポーネントのスタイル定義
 */
export const Tag: ComponentStyle<TagProps> = {
  baseStyle: {
    px: 3,
  },
  defaultProps: {
    colorScheme: "green",
    rounded: "full",
  },
};
