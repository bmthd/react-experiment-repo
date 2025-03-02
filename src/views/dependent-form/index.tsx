"use client";

import { DependentSelectField, Form, ItemsSelector, ResetButton, SelectField } from "@/ui/form";
import FormDebug from "@/ui/form/debug";
import { Button, Card, Container, Heading, HStack, Link } from "@yamada-ui/react";
import { FC } from "react";
import * as R from "remeda";
import * as v from "valibot";
import carList from "./car-list.json";

type CarList = typeof carList;

type Manufacturer = keyof CarList;

type Model<T extends Manufacturer> = keyof CarList[T];

const manufacturers = R.keys(carList);

const models = <T extends Manufacturer>(manufacturer: T) => R.keys(carList[manufacturer]);

const grades = <T extends Manufacturer>(manufacturer: T, model: Model<T>) =>
  carList[manufacturer][model] as string[];

const hasModel = <T extends Manufacturer>(manufacturer: T, input: unknown) =>
  v.is(v.picklist(models(manufacturer)), input);

const hasGrade = <T extends Manufacturer>(manufacturer: T, model: Model<T>, input: unknown) =>
  v.is(v.picklist(grades(manufacturer, model)), input);

const schema = v.pipe(
  v.object({
    manufacturer: v.nonOptional(v.picklist(manufacturers)),
    model: v.nonOptional(v.string()),
    grade: v.nonOptional(v.string()),
  }),
  v.forward(
    v.check(
      (input) => hasModel(input.manufacturer, input.model),
      "選択肢に存在しないモデルが選ばれました。",
    ),
    ["model"],
  ),
  v.forward(
    v.check(
      (input) => hasGrade(input.manufacturer, input.model as never, input.grade),
      "選択肢に存在しないグレードが選ばれました。",
    ),
    ["grade"],
  ),
);

const modelItemsSelector: ItemsSelector<{ manufacturer: Manufacturer }> = ({ manufacturer }) =>
  R.keys(carList[manufacturer]);

const gradeItemsSelector: ItemsSelector<{ manufacturer: Manufacturer; model: string }> = ({
  manufacturer,
  model,
}) => {
  if (!hasModel(manufacturer, model)) return [];
  const models = carList[manufacturer];
  return models[model as keyof typeof models];
};

export const DependsForm: FC = () => {
  return (
    <Container as={Card} roundedTop={0}>
      <Heading>依存関係のあるフォーム</Heading>
      <Form schema={schema} display="contents">
        {({ field }) => (
          <>
            <SelectField label="メーカー" name={field.manufacturer.name} items={manufacturers} />
            <DependentSelectField
              label="車種"
              name={field.model.name}
              dependentFieldNames={["manufacturer"]}
              itemsSelector={modelItemsSelector}
            />
            <DependentSelectField
              label="グレード"
              name={field.grade.name}
              dependentFieldNames={["manufacturer", "model"]}
              itemsSelector={gradeItemsSelector}
            />
            <HStack justifyContent="space-between">
              <ResetButton />
              <Button>送信</Button>
            </HStack>
            <FormDebug />
          </>
        )}
      </Form>
      <Link
        external
        href="https://github.com/bmthd/react-experiment-repo/blob/master/src/views/dependent-form/index.tsx"
      >
        コード
      </Link>
    </Container>
  );
};
