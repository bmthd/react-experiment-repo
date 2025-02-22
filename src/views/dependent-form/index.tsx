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

const manufacturers = R.keys(carList);

const hasModel = <T extends Manufacturer>(manufacturer: T, input: unknown) =>
  v.is(v.picklist(R.keys(carList[manufacturer])), input);

const schema = v.pipe(
  v.object({
    manufacturer: v.picklist(manufacturers),
    model: v.string(),
    grade: v.string(),
  }),
  v.check((input) => {
    if (!hasModel(input.manufacturer, input.model)) return false;
    return true;
  }),
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
    <Container as={Card}>
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
