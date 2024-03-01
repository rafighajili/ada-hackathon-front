"use client";

import { ProjectLogo } from "#/components";
import { useAppSelector } from "#/store";
import { selectAuth } from "#/store/slices";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Children } from "#/types";
import NextLink from "next/link";

export default function AuthLayout({ children }: Children) {
  const { isLoading, user } = useAppSelector(selectAuth);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !!user) {
      router.push("/dashboard");
    }
  }, [isLoading, user]);

  if (isLoading) {
    return null;
  }

  return (
    <div>
      <div className="container flex min-h-screen flex-col items-center gap-y-16 py-32">
        <NextLink href="/">
          <ProjectLogo size={120} />
        </NextLink>

        <main className="w-full max-w-md [&>form]:w-full">{children}</main>
      </div>
    </div>
  );
}
