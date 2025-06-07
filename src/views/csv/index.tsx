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
    dynamicTyping: true,
  });
  const validationResult = v.safeParse(v.array(salesDataSchema), papaResult.data);

  return (
    <Container bg="white" roundedTop={0} p={4}>
      <Heading>CSVデータを型安全に扱う</Heading>
      <Markdown>{`\`\`\`csv\n${csvString}\n\`\`\``}</Markdown>
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

const salesDataSchema = v.object({
  itemId: v.string(),
  productName: v.string(),
  category: v.string(),
  unitPrice: v.number(),
  salesCount: v.number(),
  saleDate: v.string(),
});

type SalesData = v.InferOutput<typeof salesDataSchema>;

const CSVTable: FC<{ data: SalesData[] }> = ({ data }) => {
  const columns: Column<SalesData>[] = [
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
