"use client";

import { Button as ButtonAria } from "react-aria-components";
import { Button, Card } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";
import { useUploadReportVideoMutation } from "#/services";
import { useAppSelector } from "#/store";
import { selectAuth } from "#/store/slices";
import { useState } from "react";

const values = [
  ["Gender", "Male"],
  ["GHD rate", 32],
  ["Depression level", 24],
  ["Cancer rate", 17],
  ["Smokes", "Yes"],
  ["Disease rate", 9],
];

function calculateAverage(numbers: number[]) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum / numbers.length;
}

function convertSnakeCaseToTitleCase(str: string) {
  return str.replace("_", " ").replace(/\b\w/g, (firstLetter) => firstLetter.toUpperCase());
}

export default function Page() {
  const { user } = useAppSelector(selectAuth);

  const [file, setFile] = useState<File | null>(null);

  const [uploadReportVideo, { isLoading }] = useUploadReportVideoMutation();

  const totalAvg =
    user &&
    user.report !== null &&
    calculateAverage(Object.values(user.report).filter((val) => typeof val === "number") as number[]);

  return (
    user && (
      <div className="[&>div]:mt-12 [&>div]:space-y-6 [&_h1]:text-3xl [&_h1]:font-bold [&_h2]:text-2xl [&_h2]:font-bold">
        <h1>Dashboard</h1>

        {user.report === null ? (
          <div>
            <div>
              <h2>Upload your video</h2>
              <p>Click the button below to upload your video.</p>
            </div>

            <div>
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
                {file ? "Your video was saved" : "Upload your video"}
              </ButtonAria>
            </div>

            <Button color="primary" isDisabled={!file} onPress={() => file && uploadReportVideo({ file })}>
              Upload
            </Button>
          </div>
        ) : (
          <div>
            <div>
              <h2>Your results</h2>
              <p>Your results according to AI.</p>
              {totalAvg && (
                <p className={`text-3xl font-medium ${totalAvg > 50 ? "text-error" : "text-success"}`}>{totalAvg}%</p>
              )}
            </div>

            <div className="grid grid-cols-3 gap-6">
              <Card className="space-y-3 p-6 text-center">
                <p className="font-bold">Gender</p>
                <p className="text-secondary">{user.report.gender}</p>
              </Card>

              <Card className="space-y-3 p-6 text-center">
                <p className="font-bold">GHD Rate</p>
                <p className="text-secondary">{user.report.ghd_rate}%</p>
              </Card>

              <Card className="space-y-3 p-6 text-center">
                <p className="font-bold">Depression level</p>
                <p className="text-secondary">{user.report.depression_level}%</p>
              </Card>

              <Card className="space-y-3 p-6 text-center">
                <p className="font-bold">Cancer rate</p>
                <p className="text-secondary">{user.report.cancer_rate}%</p>
              </Card>

              <Card className="space-y-3 p-6 text-center">
                <p className="font-bold">Smoke rate</p>
                <p className="text-secondary">{user.report.smoke}%</p>
              </Card>

              <Card className="space-y-3 p-6 text-center">
                <p className="font-bold">Disease rate</p>
                <p className="text-secondary">{user.report.disease_rate}%</p>
              </Card>
            </div>
          </div>
        )}
      </div>
    )
  );
}
