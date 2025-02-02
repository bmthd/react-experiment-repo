import { type ComponentStyle, type LoadingProps } from "@yamada-ui/react";

/**
 * Loadingコンポーネントのスタイル定義
 */
export const Loading: ComponentStyle<LoadingProps> = {
  defaultProps: {
    size: "6xl",
    variant: "oval",
  },
};
