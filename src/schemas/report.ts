import { z } from "zod";

export const ReportSchema = z.object({
  id: z.string().uuid(),
  gender: z.string(),
  ghd_rate: z.number(),
  depression_level: z.number(),
  cancer_rate: z.number(),
  smoke: z.number(),
  disease_rate: z.number(),
  file_path: z.string(),
});

export interface ReportType extends z.infer<typeof ReportSchema> {}
