import type { ButtonProps, ComponentStyle } from "@yamada-ui/react";

/**
 * ボタンコンポーネントのスタイル定義
 */
export const Button: ComponentStyle<ButtonProps> = {
  baseStyle: {
    color: "white",
  },
  variants: {
    primary: {
      bg: "primary.400",
      _hover: {
        bg: "primary.600",
      },
    },
    success: {
      bg: "success.500",
      _hover: {
        bg: "success.600",
      },
    },
    danger: {
      bg: "danger.500",
      _hover: {
        bg: "danger.700",
      },
    },
  },
  defaultProps: {
    colorScheme: "primary",
  },
};
