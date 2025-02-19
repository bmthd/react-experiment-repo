"use client";

import { DependencySelectField, Form, SelectField } from "@/ui/form";
import { Button, Card, Container, Heading, HStack } from "@yamada-ui/react";
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
    // if (input.manufacturer in car && !(input.model in car[input.manufacturer])) {
    //   return false
    // }
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

const manufacturers = Object.keys(car);

export const DependsForm: FC = () => {
  return (
    <Container as={Card}>
      <Heading>依存関係のあるフォーム</Heading>
      <Form schema={schema}>
        {({ field }) => (
          <>
            <SelectField label="メーカー" name={field.manufacturer.name} items={manufacturers} />
            <DependencySelectField
              label="車種"
              name={field.model.name}
              dependencyFieldName="manufacturer"
              itemsSelector={(manufacturer = "") =>
                manufacturer in car ? Object.keys(car[manufacturer as keyof typeof car]) : []
              }
            />
            <DependencySelectField
              label="グレード"
              name={field.grade.name}
              dependencyFieldName="model"
              itemsSelector={(model = "") => []}
            />
            <HStack alignItems="self-end">
              <Button type="submit">送信</Button>
            </HStack>
          </>
        )}
      </Form>
    </Container>
  );
};
