"use client";

import { store } from "#/store";
import { authService } from "#/services";
import { Children } from "#/types";

export default function RootLayout({ children }: Children) {
  store.dispatch(authService.endpoints.getUser.initiate());
  return children;
}
