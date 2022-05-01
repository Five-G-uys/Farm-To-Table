import React, { useState, ChangeEvent, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

interface Column {
  id: 'id' | 'farm_id' | 'subscription_entry_id' | 'delivery_date' 
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'id', label: 'ID', minWidth: 170 },
  { id: 'farm_id', label: 'Farm ID', minWidth: 100 },
  {
    id: 'subscription_entry_id',
    label: 'Subscription ID',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'delivery_date',
    label: 'Delivery Date',
    minWidth: 170,
    align: 'right',
  },
];

interface Data {
  id: string;
  farm_id: string;
  subscription_entry_id: number;
  delivery_date: Date;
}

function createData(
  id: string,
  farm_id: string,
  subscription_entry_id: number,
  delivery_date: string
): Data {
  return { id, farm_id, subscription_entry_id, delivery_date };
}

// const rows = [
//   {
//     "id": 1,
//     "farm_id": 1,
//     "subscription_entry_id": 1,
//     "delivery_date": "2022-05-07T06:00:00.000Z",
//     "createdAt": "2022-05-01T02:23:04.310Z",
//     "updatedAt": "2022-05-01T02:23:04.310Z"
// },
//   // createData('India', 'IN', 1324171354, '2022-05-13'),
  
// ];

const OrdersRecords = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([])

  const getOrders = () => {
    axios.get("/records/orders")
      .then((data) => {
        // console.log(data.data);
        setRows(data.data)
      })
      .catch((error) => {
        console.log("failed request", error);
      })
  }

  useEffect(() => {
    getOrders();
  }, [])

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default OrdersRecords;
