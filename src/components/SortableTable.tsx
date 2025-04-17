import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { SortableTableProps } from "../interface/props/SortableTableProps";
import JoinSessionDialog from "./JoinSessionDialog";

function SortableTable({ tableTitle }: Readonly<SortableTableProps>) {
  
  return (
    <Box>
      <Typography 
        variant="h6" 
        component="div" 
        align="left"
        sx={{ flexGrow: "1", mb: 2 }}
      >
        {tableTitle}
      </Typography>
      <Paper elevation={12}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Test Header</TableCell>
                <TableCell>Test Header</TableCell>
                <TableCell>Test Header</TableCell>
                <TableCell>Test Header</TableCell>
                <TableCell>Test Header</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Test Row</TableCell>
                <TableCell>Test Row</TableCell>
                <TableCell>Test Row</TableCell>
                <TableCell>Test Row</TableCell>
                <TableCell>Test Row</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <JoinSessionDialog />
    </Box>
  )
}

export default SortableTable;