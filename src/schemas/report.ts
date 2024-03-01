import { z } from "zod";

export const ReportSchema = z.object({
  id: z.string().uuid(),
  gender: z.string(),
  ghd_rate: z.string(),
  depression_level: z.string(),
  cancer_rate: z.string(),
  smoke: z.string(),
  disease_rate: z.string(),
  file_path: z.string(),
});

export interface ReportType extends z.infer<typeof ReportSchema> {}
