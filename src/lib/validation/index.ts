import "@valibot/i18n/ja";
import * as v from "valibot";

export const configureValidationSettings = () => {
  v.setGlobalConfig({ lang: "ja" });
  v.setSpecificMessage(v.email, "メールアドレスの形式が正しくありません", "ja");
  v.setSpecificMessage(v.nonOptional, "必須項目です", "ja");
};
