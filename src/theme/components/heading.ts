import { type ComponentStyle, type HeadingProps } from "@yamada-ui/react";

/**
 * Headingコンポーネントのスタイル定義
 */
export const Heading: ComponentStyle<"Heading", HeadingProps> = {
  baseStyle: {
    whiteSpace: "nowrap",
    color: "black",
  },
  variants: {
    h1: {
      fontSize: "2rem",
      as: "h1",
    },
    h2: {
      fontSize: "1.5rem",
      as: "h2",
    },
    h3: {
      fontSize: "1.17rem",
      as: "h3",
    },
    h4: {
      fontSize: "1rem",
      as: "h4",
    },
    h5: {
      fontSize: "0.83rem",
      as: "h5",
    },
    h6: {
      fontSize: "0.67rem",
      as: "h6",
    },
  },
  defaultProps: {
    variant: "h2",
  },
};
