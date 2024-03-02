"use client";

import { Children } from "#/types";
import { MyFooter, MyNavbar } from "#/components";
import { useAppSelector } from "#/store";
import { selectAuth } from "#/store/slices";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({ children }: Children) {
  const { isLoading, user } = useAppSelector(selectAuth);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/");
    }
  }, [isLoading, user]);

  if (!user) {
    return null;
  }

  return (
    <>
      <MyNavbar />
      <div className="container py-12">{children}</div>
      <MyFooter />
    </>
  );
}
