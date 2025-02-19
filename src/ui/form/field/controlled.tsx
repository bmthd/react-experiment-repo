"use client";
import { FieldName, getSelectProps, useField, useInputControl } from "@conform-to/react";
import { handlerAll, Select, SelectItem, SelectProps } from "@yamada-ui/react";
import { useCallback, useEffect, useMemo, type FC } from "react";
import { pipe } from "remeda";
import { CustomFormControl } from "./form-control";
import { type FieldProps } from "./types";
import { getFieldErrorProps } from "./utils";

type SelectItems = ReadonlyArray<string> | ReadonlyArray<{ label: string; value: string }>;

const convertItems = (items: SelectItems): SelectItem[] =>
  items.map((item) => {
    if (typeof item === "string") {
      return { label: item, value: item };
    }
    return item;
  });

interface SelectFieldProps extends FieldProps<string>, Omit<SelectProps, "name" | "items"> {
  items?: SelectItems;
}

export const SelectField: FC<SelectFieldProps> = ({
  name = "",
  label,
  helperMessage,
  onChange,
  ...props
}) => {
  const [field] = useField(name);
  const { value, change, blur, focus } = useInputControl(field);

  const handleChange = useCallback(handlerAll(change, onChange), [change, onChange]);

  const { defaultValue: _, ...mergedProps } = {
    ...props,
    ...getSelectProps(field, { value: false }),
  };

  const items = useMemo(() => convertItems(props.items ?? []), [props.items]);
  return (
    <CustomFormControl {...{ label, helperMessage }} {...getFieldErrorProps(field)}>
      <Select
        value={value}
        onChange={handleChange}
        onBlur={blur}
        onFocus={focus}
        {...mergedProps}
        items={items}
        key={field.key}
      />
    </CustomFormControl>
  );
};

type DependencySelectFieldProps<
  T extends Record<string, unknown>,
  V extends string,
  D extends FieldName<V, T, string[]>,
> = SelectFieldProps & {
  name: FieldName<string, T, string[]>;
  dependencyFieldName: D;
  itemsSelector: (value: V | undefined) => SelectItems;
};

/**
 * 別の入力欄の値に依存して選択肢が変わるSelect入力欄
 */
export const DependencySelectField = <
  T extends Record<string, unknown>,
  D extends FieldName<V, T, string[]>,
  V extends string,
>({
  name = "",
  label,
  helperMessage,
  onChange,
  dependencyFieldName,
  itemsSelector,
  ...props
}: DependencySelectFieldProps<T, V, D>) => {
  const [field, form] = useField(name);
  const [dependencyField] = useField(dependencyFieldName);
  const items = useMemo<SelectItem[] | undefined>(
    () => pipe(dependencyField.value, itemsSelector, convertItems),
    [dependencyField.value],
  );
  const { value, change, blur, focus } = useInputControl(field);

  const handleChange = useCallback(handlerAll(change, onChange), [change, onChange]);

  useEffect(() => {
    form.reset({ name });
  }, [items, handleChange]);

  const { defaultValue: _, ...mergedProps } = {
    ...props,
    ...getSelectProps(field, { value: false }),
  };
  return (
    <CustomFormControl {...{ label, helperMessage }} {...getFieldErrorProps(field)}>
      <Select
        value={value}
        onChange={handleChange}
        onBlur={blur}
        onFocus={focus}
        {...mergedProps}
        items={items}
        disabled={items.length === 0}
        key={field.key}
      />
    </CustomFormControl>
  );
};
