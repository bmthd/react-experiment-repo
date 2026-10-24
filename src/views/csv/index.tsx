import { CodeBlock } from "@/ui/code-block";
import {
  ArrowDownIcon,
  Box,
  Container,
  Heading,
  HStack,
  Table,
  type TableProps,
} from "@yamada-ui/react";
import { readFileSync } from "node:fs";
import path from "node:path";
import papa from "papaparse";
import type { FC } from "react";
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
    <Container.Root bg="white" roundedTop={0} p={4}>
      <Container.Body alignItems="stretch">
        <Heading>CSVデータを型安全に扱う</Heading>
        <CodeBlock code={csvString} language="csv" />
        <HStack justifyContent="center">
          <ArrowDownIcon fontSize="xxx-large" />
        </HStack>
        {validationResult.success ? (
          <Box overflowX="auto" w="full" whiteSpace="nowrap">
            <CSVTable data={validationResult.output} />
          </Box>
        ) : (
          <pre>{JSON.stringify(validationResult.issues, null, 2)}</pre>
        )}
      </Container.Body>
    </Container.Root>
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

const CSVTable: FC<{ data: SalesData[] } & Omit<TableProps<SalesData>, "columns">> = ({
  data,
  ...props
}) => {
  const columns: TableProps<SalesData>["columns"] = [
    { header: "商品ID", accessorKey: "itemId" },
    { header: "商品名", accessorKey: "productName" },
    { header: "カテゴリ", accessorKey: "category" },
    { header: "単価", accessorKey: "unitPrice" },
    { header: "販売数", accessorKey: "salesCount" },
    { header: "販売日", accessorKey: "saleDate" },
  ];
  return <Table {...{ data, columns }} {...props} />;
};
