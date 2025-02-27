import { getSourceCode, SourceCode } from "@/views/source-code";

export default () => {
  const code = getSourceCode("src/views/server-form/inquiry-form/index.tsx");
  return <SourceCode code={code} />;
};
