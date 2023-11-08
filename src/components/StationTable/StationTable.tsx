import {
  useDeleteStationMutation,
  useGetMyStationsQuery,
} from "@/redux/services/stationApi";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import { Typography, useMediaQuery } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

import { TableRowsLoader } from "@/components/TableLoader/TableLoader";
import { ApiStation } from "@/redux/types";

export const SmartCell = (props: any) => {
  const matches = useMediaQuery("(max-width:600px)");
  return (
    <TableCell sx={matches ? { padding: "6px" } : {}} {...props}>
      {props.children}
    </TableCell>
  );
};
export const StationTable = (props: { addFetching: boolean }) => {
  const { addFetching } = props;
  const { data, isFetching } = useGetMyStationsQuery();
  const [deleteStation, { isLoading: isDeleting }] = useDeleteStationMutation();

  if (data && data.length === 0) {
    return <Typography> Your weather stations will be listed here</Typography>;
  }
  return (
    <Box>
      {isFetching || addFetching || isDeleting ? (
        <TableContainer sx={{ maxWidth: 650 }} component={Paper}>
          <Table sx={{ maxWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Latitude</TableCell>
                <TableCell>Longitude</TableCell>
                <TableCell>Altitude</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRowsLoader rowsNum={2} columnNum={5} />
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <TableContainer sx={{ maxWidth: 650 }} component={Paper}>
          <Table sx={{ maxWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <SmartCell>Name</SmartCell>
                <SmartCell>Latitude</SmartCell>
                <SmartCell>Longitude</SmartCell>
                <SmartCell>Altitude</SmartCell>
                <SmartCell></SmartCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((station: ApiStation) => (
                  <TableRow key={station.id}>
                    <SmartCell>{station.name}</SmartCell>
                    <SmartCell>{station.latitude}</SmartCell>
                    <SmartCell>{station.longitude}</SmartCell>
                    <SmartCell>{station.altitude}</SmartCell>

                    <SmartCell>
                      <IconButton onClick={() => deleteStation(station.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </SmartCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};
