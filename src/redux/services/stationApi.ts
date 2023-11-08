import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseApiUrlBuilder, getApiKey } from "@/utils";
import { ApiPath, StationModel, StationRequest } from "@/redux/types";

const apiKeyInQuery = () => new URLSearchParams({ appid: getApiKey() });
export const stationApi = createApi({
  reducerPath: "stationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseApiUrlBuilder(ApiPath.Station),
  }),
  tagTypes: ["Stations"],
  endpoints: (builder) => ({
    getMyStations: builder.query<StationRequest, void>({
      query: () => ({ url: `stations?${apiKeyInQuery()}` }),
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ id }) => ({ type: "Stations", id }) as const),
              { type: "Stations", id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: "Stations", id: "LIST" }],
    }),
    addMyStations: builder.mutation<StationModel, Partial<StationModel>>({
      query: (body) => ({
        headers: { "Content-Type": "application/json" },
        url: `stations?${apiKeyInQuery()}`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Stations", id: "LIST" }],
    }),
    deleteStation: builder.mutation<{}, string>({
      query: (id) => ({
        url: `stations/${id}?${apiKeyInQuery()}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Stations", id }],
    }),
  }),
});
export const {
  useGetMyStationsQuery,
  useAddMyStationsMutation,
  useDeleteStationMutation,
} = stationApi;
