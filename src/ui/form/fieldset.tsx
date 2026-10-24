import type { FieldMetadata } from "@conform-to/react";
import { Fieldset } from "@yamada-ui/react";
import type { ReactNode } from "react";

type FieldObjectProps<
  T extends FieldMetadata<Record<string, any> | undefined, any, any> | undefined,
> = {
  /** ConformのFieldset metadata */
  field?: T;
  children?: T extends FieldMetadata<any>
    ? (props: { field: ReturnType<T["getFieldset"]> }) => ReactNode
    : ReactNode;
} & Omit<Fieldset.RootProps, "children">;

/**
 * Conformの構造化されたfieldを受け取り、Fieldsetに割り当てて表示する
 */
export const FieldObject = <
  T extends FieldMetadata<Record<string, any> | undefined, any, any> | undefined,
>({
  field,
  children,
  ...props
}: FieldObjectProps<T>) => {
  return (
    <Fieldset.Root {...props}>
      {/* @ts-expect-error */}
      {field && typeof children === "function"
        ? children({ field: field.getFieldset() })
        : children}
    </Fieldset.Root>
  );
};
