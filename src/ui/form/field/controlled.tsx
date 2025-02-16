"use client";
import { getSelectProps, useField, useInputControl } from "@conform-to/react";
import { handlerAll, Select, SelectProps } from "@yamada-ui/react";
import { useCallback, type FC } from "react";
import { CustomFormControl } from "./form-control";
import { type FieldProps } from "./types";
import { getFieldErrorProps } from "./utils";

interface SelectFieldProps extends FieldProps<string>, Omit<SelectProps, "name"> {}

export const SelectField: FC<SelectFieldProps> = ({ name = "", label, onChange, ...props }) => {
  const [fieldMeta] = useField(name);
  const { value, change, blur, focus } = useInputControl(fieldMeta);

  const handleChange = useCallback(handlerAll(change, onChange), [change, onChange]);

  const { defaultValue: _, ...mergedProps } = {
    ...props,
    ...getSelectProps(fieldMeta, { value: false }),
  };
  return (
    <CustomFormControl label={label} {...getFieldErrorProps(fieldMeta)}>
      <Select
        value={value}
        onChange={handleChange}
        onBlur={blur}
        onFocus={focus}
        {...mergedProps}
        key={fieldMeta.key}
      />
    </CustomFormControl>
  );
};
