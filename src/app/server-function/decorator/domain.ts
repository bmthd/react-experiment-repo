import * as v from "valibot";

export const userSchema = () =>
  v.object({
    name: v.string(),
    email: v.pipe(v.string(), v.email()),
  });

export type User = v.InferOutput<ReturnType<typeof userSchema>>;
