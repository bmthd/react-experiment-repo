"use client";

import {
  AddArrayItemButton,
  FieldArray,
  Form,
  RadioGroupField,
  ResetButton,
  SelectField,
} from "@/ui/form";
import FormDebug from "@/ui/form/debug";
import { FieldObject } from "@/ui/form/fieldset";
import type { DefaultValue, FieldMetadata } from "@conform-to/react";
import {
  CheckIcon,
  CircleIcon,
  CopyIcon,
  EqualIcon,
  EqualNotIcon,
  TrashIcon,
  UsersIcon,
} from "@yamada-ui/lucide";
import { Button, Card, CardBody, CardHeader, HStack, Icon, IconButton } from "@yamada-ui/react";
import { type FC, use, useCallback, useState } from "react";
import * as v from "valibot";
import type { Subject } from "./employees";
import { getObjects } from "./functions";
import { SubjectContext } from "./store";

type Ruleset = {
  condition: "and" | "or";
  rules: {
    subject: string;
    operator: "eq" | "ne";
    object: string;
  }[];
  nested: Ruleset[];
};

const rulesetSchema: v.GenericSchema<Ruleset> = v.object({
  condition: v.union([v.literal("and"), v.literal("or")]),
  rules: v.array(
    v.object({
      subject: v.nonOptional(v.string()),
      operator: v.union([v.literal("eq"), v.literal("ne")]),
      object: v.nonOptional(v.string()),
    }),
  ),
  nested: v.array(v.lazy(() => rulesetSchema)),
});

const defaultValue: DefaultValue<Ruleset> = {
  condition: "and",
  rules: [{ subject: "", operator: "eq", object: "" }],
  nested: [],
};

const RulesetField: FC<{ field: ReturnType<FieldMetadata<Ruleset, Ruleset>["getFieldset"]> }> = ({
  field,
}) => {
  const subjects = use(SubjectContext);
  const [objects, setObjects] = useState<string[]>([]);

  const handleSubjectChange = useCallback((subject: Subject) => {
    void getObjects(subject).then(setObjects);
  }, []);

  return (
    <Card>
      <CardHeader>
        <RadioGroupField
          name={field.condition.name}
          label="条件"
          items={[
            { value: "and", label: "AND" },
            { value: "or", label: "OR" },
          ]}
          render={({ label, checked }) => (
            <Button
              as="div"
              variant={checked ? "solid" : "ghost"}
              colorScheme={checked ? "blackAlpha" : "gray"}
              startIcon={checked ? <CheckIcon /> : <Icon />}
            >
              {label}
            </Button>
          )}
        />
      </CardHeader>
      <CardBody>
        <FieldArray field={field.rules}>
          {({ field, remove, copy }) => (
            <FieldObject key={field.key} field={field}>
              {({ field }) => (
                <HStack alignItems="start">
                  <SelectField
                    name={field.subject.name}
                    items={subjects}
                    onChange={handleSubjectChange as (subject: string) => void}
                  />
                  <SelectField
                    name={field.operator.name}
                    items={[
                      { value: "eq", label: <EqualIcon /> },
                      { value: "ne", label: <EqualNotIcon /> },
                    ]}
                  />
                  <SelectField name={field.object.name} items={objects} />
                  <IconButton
                    onClick={copy}
                    icon={<CopyIcon />}
                    aria-label="複製"
                    variant="ghost"
                  />
                  <IconButton
                    onClick={remove}
                    icon={<TrashIcon />}
                    aria-label="削除"
                    variant="ghost"
                  />
                </HStack>
              )}
            </FieldObject>
          )}
        </FieldArray>
        <AddArrayItemButton
          field={field.rules}
          defaultValue={{ operator: "eq" }}
          variant="ghost"
          startIcon={<UsersIcon />}
        >
          条件を追加
        </AddArrayItemButton>
        <FieldArray field={field.nested}>
          {({ field, copy, remove }) => (
            <HStack key={field.key} alignItems="start">
              <FieldObject field={field}>
                {({ field }) => <RulesetField field={field} />}
              </FieldObject>
              <IconButton onClick={copy} icon={<CopyIcon />} aria-label="複製" variant="ghost" />
              <IconButton onClick={remove} icon={<TrashIcon />} aria-label="削除" variant="ghost" />
            </HStack>
          )}
        </FieldArray>
        <AddArrayItemButton
          field={field.nested}
          defaultValue={{
            condition: "and",
            rules: [{ subject: "", operator: "eq", object: "" }],
            nested: [],
          }}
          variant="ghost"
          startIcon={<CircleIcon />}
        >
          条件グループを追加
        </AddArrayItemButton>
      </CardBody>
    </Card>
  );
};

export const RecursiveForm: FC<{ subjects: string[] }> = ({ subjects }) => {
  return (
    <Form schema={rulesetSchema} options={{ defaultValue }}>
      {({ field }) => (
        <SubjectContext value={subjects}>
          <RulesetField field={field} />
          <Button type="submit">送信</Button>
          <ResetButton />
          <FormDebug />
        </SubjectContext>
      )}
    </Form>
  );
};
