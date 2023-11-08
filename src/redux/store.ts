import { configureStore } from "@reduxjs/toolkit";
import { weatherApi } from "@/redux/services/weatherApi";
import { stationApi } from "@/redux/services/stationApi";

export const store = configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
    [stationApi.reducerPath]: stationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      weatherApi.middleware,
      stationApi.middleware,
    ]),
  devTools: true,
});
export type RootState = ReturnType<typeof store.getState>;
