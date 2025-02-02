import { ComponentStyle, LinkProps } from "@yamada-ui/react";
import NextLink from "next/link";

export const Link: ComponentStyle<"Link", LinkProps> = {
  defaultProps: {
    as: NextLink,
  },
};
