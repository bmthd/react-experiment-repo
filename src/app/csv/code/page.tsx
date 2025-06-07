import { getSourceCode, SourceCode } from "@/views/source-code";

export default () => {
  const code = getSourceCode("src/views/csv/index.tsx");
  return <SourceCode code={code} />;
};
