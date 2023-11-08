import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Mode } from "@/redux/types";
import { weatherIconsMap } from "@/components/IconMap/IconMap";
import { Typography } from "@mui/material";
// import { MyMap } from "@/components/Map/Map";
import { TableRowsLoader } from "@/components/TableLoader/TableLoader";
import styles from "./WeatherTable.module.css";
import { SmartCell } from "@/components/StationTable/StationTable";
import dynamic from "next/dynamic";
import { JSX, useMemo } from "react";
import { LatLngTuple } from "leaflet";
import {
  useGetCurrentWeatherQuery,
  useGetForecastQuery,
} from "@/redux/services/weatherApi";

interface WeatherTableProps {
  mode: Mode;
  q: string;
}

export const WeatherTable = (props: WeatherTableProps) => {
  const { mode, q } = props;

  const {
    data: forecastData,
    error: forecastError,
    isFetching: forecastFetching,
  } = useGetForecastQuery(q, { skip: mode !== Mode.Forecast });
  const {
    data: weatherData,
    error: weatherError,
    isFetching: weatherFetching,
  } = useGetCurrentWeatherQuery(q, { skip: mode !== Mode.Current });
  const data = mode === Mode.Current ? weatherData : forecastData;
  const isFetching = mode === Mode.Current ? weatherFetching : forecastFetching;
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map/Map"), {
        loading: () => <></>,
        ssr: false,
      }),
    [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ) as <DataType extends Record<string, unknown>>({
    position,
  }: {
    position: LatLngTuple;
  }) => JSX.Element;

  if (weatherError || forecastError) {
    return <div>404 not found</div>;
  }
  return (
    <Box>
      <Box mt={2} mb={2}>
        <Typography variant="h4" fontSize={24}>
          {weatherFetching ? (
            <Skeleton width={300} />
          ) : (
            data && `Current weather for ${data.place.name}`
          )}
        </Typography>
      </Box>
      <Box className={styles.content_container}>
        <TableContainer sx={{ maxWidth: 650 }} component={Paper}>
          <Table sx={{ maxWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <SmartCell></SmartCell>
                <SmartCell></SmartCell>
                <SmartCell></SmartCell>
                <SmartCell>High</SmartCell>
                <SmartCell>Low</SmartCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isFetching ? (
                <TableRowsLoader rowsNum={5} columnNum={5} />
              ) : (
                data &&
                data.weather.map((day) => (
                  <TableRow key={day.dateTime}>
                    <SmartCell component="th" scope="row">
                      {day.dateTime}
                    </SmartCell>
                    <SmartCell>{weatherIconsMap[day.icon]}</SmartCell>
                    <SmartCell>{day.description}</SmartCell>
                    <SmartCell width={43}>{day.high} °C</SmartCell>
                    <SmartCell width={43}>{day.low + " °C"}</SmartCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box>
          <Map position={data ? data.place.coord : [0, 0]}></Map>
        </Box>
        <Box />
      </Box>
    </Box>
  );
};
