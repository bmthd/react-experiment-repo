"use client";

import {
  AccordionPropsContext,
  type AccordionRootProps,
  ButtonPropsContext,
  type ButtonProps,
  CardPropsContext,
  type CardRootProps,
  CheckboxPropsContext,
  type CheckboxProps,
  FieldsetPropsContext,
  type FieldsetRootProps,
  HeadingPropsContext,
  type HeadingProps,
  InputPropsContext,
  type InputProps,
  RadioPropsContext,
  type RadioProps,
} from "@yamada-ui/react";
import type { FC, ReactNode } from "react";

/*
 * v2でテーマの`components`が廃止されたため、
 * コンポーネントのデフォルトpropsは各PropsContextで設定する
 */

const accordionProps: Partial<AccordionRootProps> = { multiple: true };

const buttonProps: Partial<ButtonProps> = { colorScheme: "primary" };

const cardProps: Partial<CardRootProps> = { bg: "white" };

const checkboxProps: Partial<CheckboxProps> = { indicatorProps: { bg: "white" } };

const fieldsetProps: Partial<FieldsetRootProps> = {
  legendProps: { color: "accent", fontWeight: "bold" },
};

const headingProps: Partial<HeadingProps> = {
  as: "h2",
  color: "black",
  fontSize: "1.5rem",
  whiteSpace: "nowrap",
};

const inputProps: Partial<InputProps> = { bg: "white" };

const radioProps: Partial<RadioProps> = { indicatorProps: { bg: "white" } };

export const ComponentPropsProvider: FC<{ children: ReactNode }> = ({ children }) => (
  <AccordionPropsContext value={accordionProps}>
    <ButtonPropsContext value={buttonProps}>
      <CardPropsContext value={cardProps}>
        <CheckboxPropsContext value={checkboxProps}>
          <FieldsetPropsContext value={fieldsetProps}>
            <HeadingPropsContext value={headingProps}>
              <InputPropsContext value={inputProps}>
                <RadioPropsContext value={radioProps}>{children}</RadioPropsContext>
              </InputPropsContext>
            </HeadingPropsContext>
          </FieldsetPropsContext>
        </CheckboxPropsContext>
      </CardPropsContext>
    </ButtonPropsContext>
  </AccordionPropsContext>
);
