"use client";

import { Children } from "#/types";
import { MyFooter, MyNavbar } from "#/components";

export default function RootLayout({ children }: Children) {
  return (
    <>
      <MyNavbar />
      <div className="container py-12">{children}</div>
      <MyFooter />
    </>
  );
}
