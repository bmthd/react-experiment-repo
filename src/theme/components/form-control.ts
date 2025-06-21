import type { ComponentMultiStyle, FormControlProps } from "@yamada-ui/react";

/**
 * FormControlコンポーネントのスタイル定義
 */
export const FormControl: ComponentMultiStyle<FormControlProps> = {
  baseStyle: {
    label: {
      textColor: "black",
      fontWeight: "bold",
      _hover: { cursor: "auto" },
      textWrap: "nowrap",
      display: "grid",
      alignItems: "center",
    },
    legend: {
      textColor: "accent",
      fontWeight: "bold",
      fontSize: "22",
    },
  },
  variants: {
    label: {
      normal: {
        textColor: "black",
        fontWeight: "normal",
      },
    },
    legend: {
      normal: {
        textColor: "black",
        fontWeight: "normal",
      },
    },
  },
};
