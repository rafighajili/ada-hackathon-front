"use client";

import { Provider as ReduxProvider } from "react-redux";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import { store } from "#/store";
import { Children } from "#/types";

export function Providers({ children }: Children) {
  return (
    <ReduxProvider store={store}>
      <NextUIProvider>
        <ThemeProvider attribute="class" defaultTheme="system">
          {children}
        </ThemeProvider>
      </NextUIProvider>
    </ReduxProvider>
  );
}
