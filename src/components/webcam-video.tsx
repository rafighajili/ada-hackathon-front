import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Button, Progress } from "@nextui-org/react";
import { PlayIcon, StopIcon } from "@heroicons/react/24/solid";

export function WebcamVideo({ setFile }: { setFile: Dispatch<SetStateAction<File | null>> }) {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef<any>(null);
  const [capturing, setCapturing] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [recordedChunks, setRecordedChunks] = useState([]);

  useEffect(() => {
    if (seconds === 10) {
      setCapturing(false);
      handleDownload();
    } else {
      if (capturing) {
        setTimeout(() => setSeconds((prev) => +(prev + 0.1).toFixed(1)), 100);
      }
    }
  }, [capturing, seconds]);

  const handleDataAvailable = useCallback(
    ({ data }: any) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks],
  );

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    // @ts-ignore
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, { mimeType: "video/webm" });
    mediaRecorderRef.current.addEventListener("dataavailable", handleDataAvailable);
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable]);

  const handleDownload = useCallback(() => {
    mediaRecorderRef.current.stop();
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const file = new File([blob], "video.webm", { type: "video/webm" });
      setFile(file);
      setRecordedChunks([]);
    }
  }, [mediaRecorderRef, recordedChunks]);

  const videoConstraints = {
    width: 400,
    height: 400,
    facingMode: "user",
  };

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-3xl">
        <Webcam
          height={400}
          width={400}
          audio={false}
          mirrored={true}
          ref={webcamRef}
          videoConstraints={videoConstraints}
        />
      </div>

      <div className="flex items-center gap-x-3">
        <Button
          isIconOnly
          color={capturing ? "danger" : "success"}
          variant="light"
          onPress={handleStartCaptureClick}
          isDisabled={capturing}
          radius="full"
          size="sm"
        >
          {capturing ? <StopIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5" />}
        </Button>

        <Progress aria-label="Recorded seconds" value={seconds} maxValue={10} color="secondary" size="sm" />

        <span className="text-sm">{`00:${
          seconds.toFixed(0).length === 1 ? "0" + seconds.toFixed(0) : seconds.toFixed(0)
        }`}</span>
      </div>
    </div>
  );
}
