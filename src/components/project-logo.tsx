import Image from "next/image";
import { StyleProps } from "#/types";

export function ProjectLogo({ size = 200, ...otherProps }: { size?: number } & StyleProps) {
  return <Image src="/logo.png" alt="ADA Hackathon logo" height={size} width={size} priority {...otherProps} />;
}
