"use client";

import { DependentSelectField, Form, SelectField } from "@/ui/form";
import FormDebug from "@/ui/form/debug";
import { Button, Card, Container, Heading, HStack, Link } from "@yamada-ui/react";
import { FC } from "react";
import * as R from "remeda";
import * as v from "valibot";
import car from "./car.json";

const schema = v.pipe(
  v.object({
    manufacturer: v.picklist(R.keys(car)),
    model: v.string(),
    grade: v.string(),
  }),
  v.check((input) => {
    if (!v.is(v.picklist(R.keys(car)), input.manufacturer)) {
      return false;
    }
    const models = car[input.manufacturer];
    if (!v.is(v.picklist(R.keys(models)), input.model)) {
      return false;
    }
    return true;
  }),
);

const manufacturers = R.keys(car);

export const DependsForm: FC = () => {
  return (
    <Container as={Card}>
      <Heading>依存関係のあるフォーム</Heading>
      <Form schema={schema} display="contents">
        {({ form, field }) => (
          <>
            <SelectField label="メーカー" name={field.manufacturer.name} items={manufacturers} />
            <DependentSelectField
              label="車種"
              name={field.model.name}
              dependentFieldNames={["manufacturer"]}
              itemsSelector={({ manufacturer }) => R.keys(car[manufacturer])}
            />
            <DependentSelectField
              label="グレード"
              name={field.grade.name}
              dependentFieldNames={["manufacturer", "model"]}
              itemsSelector={({ manufacturer, model }) => {
                const models = car[manufacturer];
                if (!v.is(v.picklist(R.keys(models)), model)) return [];
                return models[model as keyof typeof models];
              }}
            />
            <HStack justifyContent="space-between">
              <Button type="reset" colorScheme="yellow" onClick={() => form.reset()}>
                リセット
              </Button>
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
