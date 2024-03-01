"use client";

import { Button as ButtonAria, FileTrigger } from "react-aria-components";
import { Button, Card } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";
import { useUploadReportVideoMutation } from "#/services";
import { useAppSelector } from "#/store";
import { selectAuth } from "#/store/slices";

export default function Page() {
  const { user } = useAppSelector(selectAuth);
  const [uploadReportVideo, { isLoading }] = useUploadReportVideoMutation();

  return (
    <div className="[&>div]:mt-12 [&>div]:space-y-6 [&_h1]:text-3xl [&_h1]:font-bold [&_h2]:text-2xl [&_h2]:font-bold">
      <h1>Dashboard</h1>

      <div>
        <div>
          <h2>Upload your image</h2>
          <p>Click the button below to upload your image.</p>
        </div>

        <div>
          <FileTrigger>
            <ButtonAria
              className={({ isHovered, isPressed, isFocusVisible }) =>
                twMerge(
                  "h-32 w-full rounded-xl border border-dashed border-default-500 bg-default-100 outline-none duration-200",
                  isHovered && "bg-default-200",
                  isPressed && "bg-default-300",
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

      <div>
        <div>
          <h2>Your results</h2>
          <p>Your results according to AI.</p>
          <p className="text-3xl font-medium text-success">55%</p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <Card key={num} className="space-y-3 p-6 text-center">
              <p>Lorem ipsum.</p>
              <p className="text-danger">55%</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
