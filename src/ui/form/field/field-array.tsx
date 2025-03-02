import { DefaultValue, FieldMetadata, useFormMetadata } from "@conform-to/react";
import { ReactNode, useCallback } from "react";

/**
 * Conformの配列のフィールドを子要素に割り当てる
 */
export const FieldArray = <T extends FieldMetadata<Item[]>, Item>({
  field,
  children,
}: {
  field: T;
  children: (props: {
    field: ReturnType<T["getFieldList"]>[number];
    index: number;
    insert: (defaultValue?: DefaultValue<Item>, index?: number) => void;
    copy: () => void;
    remove: () => void;
  }) => ReactNode;
}) => {
  const form = useFormMetadata();
  const insert = useCallback(
    (defaultValue?: DefaultValue<Item>, index?: number) =>
      form.insert({ name: field.name, defaultValue, index }),
    [form, field.name],
  );
  const copy = useCallback(
    (index: number) => {
      const item = field.getFieldList()[index]?.value;
      // @ts-expect-error
      form.insert({ name: field.name, defaultValue: item, index: index + 1 });
    },
    [form, field.name],
  );
  const remove = useCallback(
    (index: number) => form.remove({ name: field.name, index }),
    [form, field.name],
  );
  return field
    .getFieldList()
    .map((f, i) =>
      children({ field: f, index: i, insert, copy: () => copy(i), remove: () => remove(i) }),
    );
};
