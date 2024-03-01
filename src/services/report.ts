import { apiSlice } from "#/store/slices";
import { RegisterRequestType, ReportSchema, ReportType } from "#/schemas";

export const reportService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadReportVideo: builder.mutation<ReportType, RegisterRequestType>({
      query: (body) => ({ url: `/report`, method: "post", body }),
      transformResponse: (res: unknown) => ReportSchema.parse(res),
    }),
  }),
});

export const { useUploadReportVideoMutation } = reportService;
