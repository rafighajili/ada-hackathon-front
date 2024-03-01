import { apiSlice } from "#/store/slices";
import { LoginRequestType, RegisterRequestType, UserSchema, UserType } from "#/schemas";

export const authService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<UserType, RegisterRequestType>({
      query: (body) => ({ url: `/auth/register`, method: "post", body }),
      transformResponse: (res: unknown) => UserSchema.parse(res),
    }),

    login: builder.mutation<UserType, LoginRequestType>({
      query: (body) => ({ url: `/auth/login`, method: "post", body }),
      transformResponse: (res: unknown) => UserSchema.parse(res),
    }),

    logout: builder.mutation<void, void>({
      query: () => ({ url: `/auth/logout`, method: "post" }),
    }),

    getUser: builder.query<UserType, void>({
      query: () => ({ url: `/auth/me`, method: "get" }),
      transformResponse: (res: unknown) => UserSchema.parse(res),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation, useGetUserQuery } = authService;
