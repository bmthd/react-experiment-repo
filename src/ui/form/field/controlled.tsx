"use client";
import {
  FieldName,
  getCollectionProps,
  getSelectProps,
  useField,
  useInputControl,
} from "@conform-to/react";
import {
  handlerAll,
  HStack,
  Radio,
  RadioGroup,
  RadioProps,
  Select,
  SelectItem,
  SelectProps,
  ui,
} from "@yamada-ui/react";
import { ComponentProps, ReactNode, useCallback, useEffect, useMemo, type FC } from "react";
import * as R from "remeda";
import { CustomFormControl } from "./form-control";
import { HiddenField } from "./primitive";
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

/**
 * 別の入力欄の値を元に選択肢を生成する関数
 * @param value - 依存する値
 */
export type ItemsSelector<T extends Record<string, unknown>> = (value: T) => SelectItems;

type DependentSelectFieldProps<
  Schema extends Record<string, unknown>,
  Dependent extends FieldName<DependentValue, Schema, string[]>[],
  DependentValue extends { [K in Dependent[number]]: Schema[K] },
> = FieldProps<string> &
  Omit<SelectProps, "name" | "items"> & {
    name: FieldName<string, Schema, string[]>;
    dependentFieldNames: Dependent;
    itemsSelector: ItemsSelector<DependentValue>;
  };

/**
 * 別の入力欄の値に依存して選択肢が変わるSelect入力欄
 */
export const DependentSelectField = <
  Schema extends Record<string, unknown>,
  const Dependent extends FieldName<DependentValue, Schema, string[]>[],
  DependentValue extends { [K in Dependent[number]]: Schema[K] },
>({
  name,
  label,
  helperMessage,
  onChange,
  dependentFieldNames,
  itemsSelector,
  ...props
}: DependentSelectFieldProps<Schema, Dependent, DependentValue>) => {
  const [field, form] = useField<string, Schema, string[]>(name);
  const items = useMemo<SelectItem[]>(
    () =>
      R.pipe(
        dependentFieldNames,
        R.mapToObj((name) => [name, form.value?.[name]]),
        R.conditional(
          [
            (v) => R.values(v).some(R.isNonNullish),
            (v) =>
              R.pipe(
                // @ts-expect-error 実行時と、入口と出口の型が問題ないのでOK
                v,
                itemsSelector,
                convertItems,
              ),
          ],
          R.conditional.defaultCase(() => [] satisfies SelectItem[]),
        ),
      ),
    dependentFieldNames.map((name) => form.value?.[name]),
  );

  const { value, change, blur, focus } = useInputControl(field);

  const handleChange = useCallback(handlerAll(change, onChange), [change, onChange]);

  useEffect(() => {
    form.reset({ name });
  }, [items]);

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

interface RadioGroupFieldProps
  extends FieldProps<string>,
    Omit<ComponentProps<typeof RadioGroup>, "name" | "items"> {
  radioProps?: Omit<RadioProps, "name">;
  items: SelectItems;
  render?: ({ label, checked }: { label: string; checked: boolean }) => ReactNode;
}

export const RadioGroupField: FC<RadioGroupFieldProps> = ({
  name = "",
  label,
  helperMessage,
  radioProps,
  items,
  render,
  ...props
}) => {
  const [fieldMeta] = useField(name);
  const fields = getCollectionProps(fieldMeta, {
    type: "radio",
    options: items.map((item) => (typeof item === "string" ? item : item.value)),
  });
  const labels = items.map((item) => (typeof item === "string" ? item : item.label));

  return (
    <CustomFormControl {...{ label, helperMessage }} {...getFieldErrorProps(fieldMeta)}>
      <RadioGroup defaultValue={fieldMeta?.initialValue} {...props}>
        <HStack>
          {fields.map((field, index) =>
            render ? (
              (() => {
                const radioId = `${field.key}-radio`;
                const checked = fieldMeta.value === field.value;
                return (
                  <ui.label htmlFor={radioId}>
                    <HiddenField {...field} {...radioProps} key={field.key} />
                    {render({ label: labels[index]!, checked })}
                  </ui.label>
                );
              })()
            ) : (
              <Radio {...field} label={labels[index]} {...radioProps} key={field.key} />
            ),
          )}
        </HStack>
      </RadioGroup>
    </CustomFormControl>
  );
};
