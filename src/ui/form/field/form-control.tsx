import { Field, Grid, SlideFade, Tag } from "@yamada-ui/react";
import type { FC } from "react";

/**
 * ラベルとエラーメッセージを紐付けたフォームコントロール
 * @param props Field.RootProps
 */
export const CustomFormControl: FC<
  Field.RootProps & {
    /** ラベルを非表示にする場合に指定 */
    withoutLabel?: boolean;
    /** 必須,任意アイコンを表示にする場合に指定 */
    requireIcon?: boolean;
  }
> = ({
  children,
  label,
  required,
  errorMessage,
  labelProps,
  errorMessageProps,
  withoutLabel = false,
  requireIcon = false,
  ...props
}) => (
  <Field.Root replace required={required} {...props}>
    {!withoutLabel && (
      <Grid templateColumns="auto 1fr" alignItems="start" gap={1}>
        <Field.Label
          color="black"
          fontWeight="bold"
          cursor="auto"
          textWrap="nowrap"
          {...labelProps}
        >
          {label}
        </Field.Label>
        {requireIcon && (
          <Tag w="fit-content" size="sm" rounded="md" colorScheme={required ? "red" : "blue"}>
            {required ? "必須" : "任意"}
          </Tag>
        )}
      </Grid>
    )}
    {children}
    <SlideFade open={Boolean(errorMessage)}>
      <Field.ErrorMessage role="alert" {...errorMessageProps}>
        {errorMessage}
      </Field.ErrorMessage>
    </SlideFade>
  </Field.Root>
);
