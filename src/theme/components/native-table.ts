import { type ComponentMultiStyle, type NativeTableProps } from "@yamada-ui/react";

/**
 * NativeTableコンポーネントのデフォルトスタイル
 */
export const NativeTable: ComponentMultiStyle<"NativeTable", NativeTableProps> = {
  baseStyle: {
    th: {
      textTransform: "none",
    },
  },
};
