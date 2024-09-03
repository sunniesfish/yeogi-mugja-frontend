"use client";

import { defaultTheme } from "@/theme/theme";
import { ThemeProvider } from "styled-components";

export default function SCThemeProvider({ children }: React.PropsWithChildren) {
  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
}
