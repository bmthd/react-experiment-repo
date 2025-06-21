import { Container, Heading } from "@yamada-ui/react";
import type { FC } from "react";
import { RecursiveForm } from "./form";
import { getSubjects } from "./functions";

export const RecursiveFormPage: FC = async () => {
  const subjects = await getSubjects();
  return (
    <Container>
      <Heading>再帰的なフォーム</Heading>
      <RecursiveForm subjects={subjects} />
    </Container>
  );
};
