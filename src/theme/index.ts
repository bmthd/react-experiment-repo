import components from "@/theme/components";
import styles from "@/theme/styles";
import tokens from "@/theme/tokens";
import { extendTheme } from "@yamada-ui/react";

export default extendTheme({
  styles,
  components,
  ...tokens,
})();
