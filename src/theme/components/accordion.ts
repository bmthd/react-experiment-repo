import { type AccordionProps, type ComponentMultiStyle } from "@yamada-ui/react";

/**
 * AccordionコンポーネントのStyle
 */
export const Accordion: ComponentMultiStyle<"Accordion", AccordionProps> = {
  defaultProps: {
    isMultiple: true,
  },
};
