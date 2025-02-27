import { getSourceCode, SourceCode } from "@/views/source-code";

export default () => {
  const code = getSourceCode("src/views/prototype-form/index.tsx");
  return <SourceCode code={code} />;
};
