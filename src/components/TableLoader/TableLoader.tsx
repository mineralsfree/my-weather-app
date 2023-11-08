import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Skeleton from "@mui/material/Skeleton";

export const TableRowsLoader = ({
  rowsNum,
  columnNum,
}: {
  rowsNum: number;
  columnNum: number;
}) => {
  return [...Array(rowsNum)].map((row, index) => (
    <TableRow key={index}>
      {[...Array(columnNum)].map((col, index) => (
        <TableCell key={index}>
          <Skeleton animation="wave" variant="text" />
        </TableCell>
      ))}
    </TableRow>
  ));
};
