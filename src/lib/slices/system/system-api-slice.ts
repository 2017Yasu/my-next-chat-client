import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type SystemStatus = {
  status: string;
  message?: string;
};

export const systemApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api/system" }),
  reducerPath: "systemApi",
  tagTypes: ["SystemStatus"],
  endpoints: (build) => ({
    getSystemStatus: build.query<SystemStatus, void>({
      query: () => "/status",
    }),
  }),
});

export const { useGetSystemStatusQuery } = systemApiSlice;
