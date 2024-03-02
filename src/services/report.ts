import { apiSlice } from "#/store/slices";
import { ReportSchema, ReportType } from "#/schemas";
import { objectToFormData } from "#/utils";

export const reportService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadReportVideo: builder.mutation<ReportType, { file: File }>({
      query: (body) => ({ url: `/report`, method: "post", body: objectToFormData(body) }),
      transformResponse: (res: unknown) => ReportSchema.parse(res),
    }),
  }),
});

export const { useUploadReportVideoMutation } = reportService;
