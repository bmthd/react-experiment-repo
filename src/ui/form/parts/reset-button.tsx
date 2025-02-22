import { useFormMetadata } from "@conform-to/react";
import { Button } from "@yamada-ui/react";
import { FC, useCallback } from "react";

/**
 * Formの値をリセットするボタン
 */
export const ResetButton: FC = () => {
  const form = useFormMetadata();
  const isPristine = !form.dirty;
  const handleReset = useCallback(() => {
    form.reset();
  }, [form]);
  return (
    <Button onClick={handleReset} disabled={isPristine}>
      リセット
    </Button>
  );
};
