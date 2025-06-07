import { ArrowDownIcon } from "@yamada-ui/lucide";
import { Markdown } from "@yamada-ui/markdown";
import { Container, Heading, HStack } from "@yamada-ui/react";
import { Column, Table } from "@yamada-ui/table";
import { readFileSync } from "node:fs";
import path from "node:path";
import papa from "papaparse";
import { FC } from "react";
import * as v from "valibot";

export const CSVPage = () => {
  const csvFilePath = path.join(process.cwd(), "src/views/csv/sales_data.csv");
  const csvString = readFileSync(csvFilePath, "utf-8");
  const papaResult = papa.parse(csvString, {
    header: true,
    skipEmptyLines: true,
  });
  const validationResult = v.safeParse(csvSchema, papaResult.data);

  return (
    <Container bg="white" roundedTop={0} p={4}>
      <Heading>CSVデータを型安全に扱う</Heading>
      <Markdown>{`\`\`\`csv ${csvString}\`\`\``}</Markdown>
      <HStack justifyContent="center">
        <ArrowDownIcon fontSize="xxx-large" />
      </HStack>
      {validationResult.success ? (
        <CSVTable data={validationResult.output} />
      ) : (
        <pre>{JSON.stringify(validationResult.issues, null, 2)}</pre>
      )}
    </Container>
  );
};

const toNumberSchema = v.pipe(v.string(), v.decimal(), v.transform(Number));

const csvSchema = v.array(
  v.object({
    itemId: v.string(),
    productName: v.string(),
    category: v.string(),
    unitPrice: toNumberSchema,
    salesCount: toNumberSchema,
    saleDate: v.string(),
  }),
);

type CsvData = v.InferOutput<typeof csvSchema>;

const CSVTable: FC<{ data: CsvData }> = ({ data }) => {
  const columns: Column<CsvData[number]>[] = [
    {
      header: "商品ID",
      accessorKey: "itemId",
    },
    {
      header: "商品名",
      accessorKey: "productName",
    },
    {
      header: "カテゴリ",
      accessorKey: "category",
    },
    {
      header: "単価",
      accessorKey: "unitPrice",
    },
    {
      header: "販売数",
      accessorKey: "salesCount",
    },
    {
      header: "販売日",
      accessorKey: "saleDate",
    },
  ];
  return <Table {...{ data, columns }} />;
};
