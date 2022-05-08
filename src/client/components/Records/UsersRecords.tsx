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
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { Input } from '@mui/material';
import { FormControlUnstyledContext } from '@mui/base';

interface Column {
  id:
  | 'id'
  | 'googleId'
  | 'name'
  | 'email'
  | 'street_address'
  | 'roleId'
  | 'delivery_zone';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'id', label: 'ID', minWidth: 170 },
  { id: 'googleId', label: 'Season', minWidth: 100 },
  {
    id: 'name',
    label: 'Name',
    minWidth: 170,
  },
  {
    id: 'email',
    label: 'Email',
    minWidth: 170,
  },
  {
    id: 'street_address',
    label: 'Address',
    minWidth: 170,
  },

  {
    id: 'roleId',
    label: 'Role ID',
    minWidth: 170,
  },
  {
    id: 'delivery_zone',
    label: 'Delivery Zone',
    minWidth: 170,
  },
];

const UsersRecords = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [editing, setEditing] = useState(false);
  const [previous, setPrevious] = useState({});

  const getUsers = () => {
    axios.get('/api/users')
      .then((data) => {
        // console.log(data.data);
        setRows(data.data);
      })
      .catch((error) => {
        console.log('failed request', error);
      });
  };

  const patchUsers = async (userId: number, updatedUser: any ) => {
    try {
      const { data } = await axios.patch(`/api/users/${userId}`, updatedUser);
      console.log('patch data', data);
      return data
    } catch (err) {
      console.error(err)
      return {
        error: err
      }
    } 
  }

  // const handleDelete = () => {
  //   axios.delete("/api/orders/delete")
  //     .then((data)) =>
  // }

  useEffect(() => {
    getUsers()
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onChange = (e, row) => {
    if (!previous[row.id]) {
      setPrevious(state => ({ ...state, [row.id]: row }));
    }
    const value = e.target.value;
    const name = e.target.name;
    const { id } = row;
    const newRows = rows.map((row: any) => {
      if (row.id === id) {
        return { ...row, [name]: value };
      }
      return row;
    });
    console.log();
    setRows(newRows);
  };
  
  const onDone = (row: object) => {
    console.log(row)
    setEditing(!editing)
    patchUsers(row.id, row);
  }

  const onEdit = () => {
    setEditing(!editing)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
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
              .map((row) => (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {editing ? (
                          <Input
                            value={value}
                            name={column.label}
                            onChange={e => onChange(e, row)} />
                        ) : (
                          column.format && typeof value === 'number'
                            ? column.format(value)
                            : value
                        )}
                      </TableCell>
                    );
                  })}
                  {editing ? (
                    <DoneIcon onClick={() => onDone(row)} />
                  ) :
                  <><TableCell>
                      <EditIcon onClick={() => onEdit()} />
                    </TableCell><TableCell>
                        <DeleteIcon onClick={() => console.log(rows)} />
                      </TableCell></>
                  }

                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default UsersRecords;
