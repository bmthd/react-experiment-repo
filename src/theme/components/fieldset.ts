import { type ComponentMultiStyle, type FieldsetProps } from "@yamada-ui/react";

/**
 * Fieldsetコンポーネントのスタイル定義
 */
export const Fieldset: ComponentMultiStyle<FieldsetProps> = {
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
