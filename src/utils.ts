import {
  ApiPath,
  CurrentWeatherResponse,
  ForecastResponse,
  List,
  TableWeatherDataRow,
  WeatherData,
  weatherIconKey,
} from "@/redux/types";
import { countriesWithEmojis } from "@/consts";

export const baseApiUrlBuilder = (path: ApiPath): string => {
  if (path === ApiPath.Weather) {
    return `${process.env.NEXT_PUBLIC_WEATHER_API_URL}/${process.env.NEXT_PUBLIC_API_WEATHER_V}/`;
  } else if (path === ApiPath.Station) {
    return `https://cors-anywhere.herokuapp.com/${process.env.NEXT_PUBLIC_WEATHER_API_URL}/${process.env.NEXT_PUBLIC_API_STATION_V}/`;
  } else {
    throw new Error("Api function is not defined");
  }
};
export const getApiKey = (): string => {
  return process.env.NEXT_PUBLIC_WEATHER_API_KEY || "";
};
export const buildQuery = (q: string) => {
  const queryObject = {
    appid: getApiKey(),
    units: "metric",
    q,
  };
  return new URLSearchParams(queryObject);
};
export const currentTransformer = (
  current: CurrentWeatherResponse,
): WeatherData => {
  return {
    place: {
      name: current.name + `, ${countriesWithEmojis[current.sys.country]}`,
      coord: [current.coord.lat, current.coord.lon],
    },
    weather: [
      {
        dateTime: new Date().toDateString() + " Today",
        icon: current.weather[0].icon.slice(0, 2) as weatherIconKey,
        description: current.weather[0].description,
        high: Math.round(current.main.temp_max),
        low: Math.round(current.main.temp_min),
      },
    ],
  };
};
export const forecastTransformer = (
  forecast: ForecastResponse,
): WeatherData => {
  const tmpObj: { [key: string]: List[] } = {};
  forecast.list.forEach((value) => {
    const date = value.dt_txt.slice(0, 10);
    if (tmpObj[date]) {
      tmpObj[date].push(value);
    } else {
      tmpObj[date] = [value];
    }
  });
  let retObj: { [key: string]: TableWeatherDataRow } = {};
  Object.keys(tmpObj).forEach((key) => {
    const value = tmpObj[key];
    retObj[key] = tmpObj[key].reduce(
      (acc, curr) => {
        return {
          ...acc,
          high: Math.round(Math.max(curr.main.temp_max)),
          low: Math.round(Math.min(curr.main.temp_min)),
        };
      },
      {
        dateTime: new Date(key).toDateString(),
        icon: value[0].weather[0].icon.slice(0, 2) as weatherIconKey,
        description: value[0].weather[0].description,
        high: -Infinity,
        low: Infinity,
      },
    );
  });
  const retArr = Object.values(retObj).slice(0, 5);
  retArr[0].dateTime = retArr[0].dateTime + " Today";
  // in case we have more than 5 days from API
  const { city } = forecast;
  return {
    place: {
      name: city.name + `, ${countriesWithEmojis[city.country]}`,
      coord: [city.coord.lat, city.coord.lon],
    },
    weather: Object.values(retObj).slice(0, 5),
  };
};
