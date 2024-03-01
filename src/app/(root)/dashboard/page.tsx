"use client";

import { Button as ButtonAria, FileTrigger } from "react-aria-components";
import { Button } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";

export default function Page() {
  return (
    <div className="[&_h1]:text-3xl [&_h1]:font-bold [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-bold">
      <h1>Dashboard</h1>

      <h2>Submit your image</h2>

      <p>Click the button below to upload your image.</p>

      <div className="mt-6 space-y-6">
        <div>
          <FileTrigger>
            <ButtonAria
              className={({ isHovered, isPressed, isFocusVisible }) =>
                twMerge(
                  "h-32 w-full rounded-xl border border-dashed border-default-700 bg-default-200 outline-none duration-200",
                  isHovered && "bg-default-300",
                  isPressed && "bg-default-400",
                  isFocusVisible && "outline outline-offset-2 outline-primary",
                )
              }
            >
              Upload your image
            </ButtonAria>
          </FileTrigger>
        </div>

        <Button color="primary">Upload</Button>
      </div>
    </div>
  );
}
