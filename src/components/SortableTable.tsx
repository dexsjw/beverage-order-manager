import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Key, ReactNode } from "react";
import { SortableTableProps } from "../type-interface/props/SortableTableProps";

function SortableTable<T extends { id: Key, [key: string | number]: ReactNode }>({
  tableTitle, 
  tableHeaders,
  tableData,
  selectedRowId,
  handleRowSelect
  // TODO: include row select function to run when row is selected e.g. open dialog, edit field
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
                <TableCell />
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map(data => (
                <TableRow 
                  hover
                  key={data.id}
                  selected={data.id === selectedRowId}
                  onClick={() => handleRowSelect(data.id)}
                >
                  {tableHeaders.map(header => (
                    <TableCell key={header.id}>
                      {data[header.id]}
                    </TableCell>
                  ))}
                  <TableCell>
                    <IconButton onClick={() => {}}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => {}}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}

export default SortableTable;