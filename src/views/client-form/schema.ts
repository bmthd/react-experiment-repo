import * as v from "valibot";

export const inquiryFormSchema = v.object({
  name: v.nonOptional(v.string()),
  email: v.nonOptional(v.pipe(v.string(), v.email())),
  message: v.nonOptional(v.string()),
});

export type InquiryFormInput = v.InferInput<typeof inquiryFormSchema>;
