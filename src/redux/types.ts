import { countriesWithEmojis } from "@/consts";
import { weatherIconsMap } from "@/components/IconMap/IconMap";
import { LatLngTuple } from "leaflet";

export interface CurrentWeatherResponse {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: { country: keyof typeof countriesWithEmojis };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface ForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: List[];
  city: City;
}

export interface City {
  id: number;
  name: string;
  coord: Coord;
  country: keyof typeof countriesWithEmojis;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface Coord {
  lat: number;
  lon: number;
}

export interface List {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  sys: { country: string };
  dt_txt: string;
  rain?: Rain;
  snow?: Rain;
}

export interface Clouds {
  all: number;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

export interface Rain {
  "3h": number;
}
export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

export type TableWeatherDataRow = {
  dateTime: string;
  icon: weatherIconKey;
  description: string;
  high: number;
  low: number;
};
export type TableWeatherData = TableWeatherDataRow[];
export type WeatherData = {
  place: { name: string; coord: LatLngTuple };
  weather: TableWeatherData;
};
export type weatherIconKey = keyof typeof weatherIconsMap;
export type ApiStation = {
  id: string;
  created_at: string;
  updated_at: string;
  external_id: string;
  name: string;
  longitude: number;
  latitude: number;
  altitude: number;
  rank: number;
};
export type StationRequest = ApiStation[];

export type StationModel = {
  name: string;
  longitude: number;
  latitude: number;
  altitude: number;
  external_id: string;
};
export enum Mode {
  Current = "current",
  Forecast = "forecast",
}
export enum ApiPath {
  Station = "station",
  Weather = "weather",
}
