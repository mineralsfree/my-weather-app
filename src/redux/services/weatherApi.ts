import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  baseApiUrlBuilder,
  buildQuery,
  currentTransformer,
  forecastTransformer,
} from "@/utils";
import {
  ApiPath,
  CurrentWeatherResponse,
  ForecastResponse,
  WeatherData,
} from "@/redux/types";

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  keepUnusedDataFor: 300,
  baseQuery: fetchBaseQuery({ baseUrl: baseApiUrlBuilder(ApiPath.Weather) }),
  endpoints: (builder) => ({
    getCurrentWeather: builder.query<WeatherData, string>({
      query: (q) => `weather?${buildQuery(q)}`,
      transformResponse: (resp: CurrentWeatherResponse): WeatherData =>
        currentTransformer(resp),
    }),
    getForecast: builder.query<WeatherData, string>({
      query: (q: string) => `forecast?${buildQuery(q)}`,
      transformResponse: (resp: ForecastResponse): WeatherData =>
        forecastTransformer(resp),
    }),
  }),
});
export const { useGetForecastQuery, useGetCurrentWeatherQuery } = weatherApi;
