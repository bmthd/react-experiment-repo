import { type ComponentMultiStyle } from "@yamada-ui/react";

/**
 * Tableコンポーネントのスタイル定義
 */
export const Table: ComponentMultiStyle<"Table"> = {
  baseStyle: {
    th: {
      color: "white",
      bgColor: "accent",
    },
    tbody: {
      tr: {
        _odd: {
          bgColor: "white",
        },
        _even: {
          bgColor: "whitesmoke",
        },
      },
    },
  },
  defaultProps: {
    sortIconProps: {
      size: "2xl",
    },
    highlightOnHover: true,
    rowsClickSelect: true,
    theadProps: {
      position: "sticky",
      top: "0",
      zIndex: "10",
    },
  },
};
