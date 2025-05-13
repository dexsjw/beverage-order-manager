import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Key, ReactNode } from "react";
import { SortableTableProps } from "../interface/props/SortableTableProps";
import JoinSessionDialog from "./JoinSessionDialog";

function SortableTable<T extends { id: Key, [key: string]: ReactNode }>({
  tableTitle, 
  tableHeaders,
  tableData
}: Readonly<SortableTableProps<T>>) {
  
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
                {tableHeaders.map(header => (
                  <TableCell key={header.id}>
                    {header.name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map(data => (
                <TableRow key={data.id}>
                  {tableHeaders.map(header => (
                    <TableCell key={header.id}>
                      {data[header.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <JoinSessionDialog />
    </Box>
  )
}

export default SortableTable;