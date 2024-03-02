import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "#/schemas";
import { RootState } from "#/store";
import { authService, reportService } from "#/services";

const initialState: {
  user: UserType | null;
  isLoading: boolean;
} = {
  user: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    resetAuth: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(authService.endpoints.register.matchFulfilled, (state, { payload }) => {
      state.user = payload;
    });
    builder.addMatcher(authService.endpoints.login.matchFulfilled, (state, { payload }) => {
      state.user = payload;
    });
    builder.addMatcher(authService.endpoints.logout.matchFulfilled, (state) => {
      state.user = null;
    });

    builder.addMatcher(authService.endpoints.getUser.matchPending, (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(authService.endpoints.getUser.matchFulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
    });
    builder.addMatcher(authService.endpoints.getUser.matchRejected, (state) => {
      state.isLoading = false;
    });

    builder.addMatcher(reportService.endpoints.uploadReportVideo.matchFulfilled, (state, { payload }) => {
      if (state.user) {
        state.user = { ...state.user, report: payload };
      }
    });
  },
});

export const authReducer = authSlice.reducer;
export const { resetAuth } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
