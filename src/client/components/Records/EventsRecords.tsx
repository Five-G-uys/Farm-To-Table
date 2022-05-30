// Import Dependencies
import React, { useState, ChangeEvent, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Input from '@material-ui/core/Input';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import swal from 'sweetalert';
import axios from 'axios';

interface Column {
  id:
    | 'id'
    | 'eventName'
    | 'description'
    | 'eventDate'
    | 'location'
    | 'eventType';
  label: string;
  minWidth?: number;
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'id', label: 'ID', minWidth: 170 },
  { id: 'eventName', label: 'Event Name', minWidth: 100 },
  {
    id: 'description',
    label: 'Description',
    minWidth: 170,
<<<<<<< HEAD
=======
    align: 'right',
>>>>>>> 603a1cc844d3117913aaf20623089d3c122918ec
  },
  {
    id: 'eventDate',
    label: 'Date',
    minWidth: 170,
  },
  {
    id: 'location',
    label: 'Location',
    minWidth: 170,
  },
  {
    id: 'eventType',
    label: 'Event Type',
    minWidth: 170,
  },
];

const EventsRecords = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [rowEditing, setRowEditing] = useState(null);
  const [editing, setEditing] = useState(false);
  const [rowColumnId, setRowColumnId] = useState({});
  const [deleteCount, setDeleteCount] = useState(0);

  const getEvents = () => {
    axios
      .get('/api/events')
      .then((data) => {
        // console.log(data.data);
        setRows(data.data);
      })
      .catch((error) => {
        console.log('failed request', error);
      });
  };

  const patchEvents = async (eventId: string, updatedEvent: any) => {
    try {
<<<<<<< HEAD
      const { data } = await axios.patch(`/api/events/${eventId}`, updatedEvent);
      toast.success('Vendor Updated', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      return data
=======
      const { data } = await axios.patch(
        `/api/events/${eventId}`,
        updatedEvent,
      );
      return data;
>>>>>>> 603a1cc844d3117913aaf20623089d3c122918ec
    } catch (err) {
      console.error(err);
      return {
        error: err,
      };
    }
  };

  const deleteEvents = async (eventId: string) => {
<<<<<<< HEAD
    swal({
      title: 'Are you sure?',
      text: 'Vendor will be deleted, along with all associated products!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then( async (willDelete) => {
      if (willDelete) {
        swal('Event has been deleted', {
          icon: 'success',
        });
        try {
          const { data } = await axios.patch(`/api/events/${eventId}`);
          setDeleteCount((deleteCount) => deleteCount + 1)
          return data;
        } catch (err) {
          console.error(err);
          return {
            error: err,
          };
        }
      } else {
        swal('That was a close one!');
      }
    });
  }
=======
    try {
      const { data } = await axios.delete(`/api/events/${eventId}`);
      return data;
    } catch (err) {
      console.error(err);
      return {
        error: err,
      };
    }
  };
>>>>>>> 603a1cc844d3117913aaf20623089d3c122918ec

  useEffect(() => {
    getEvents();
  }, [deleteCount]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    row: any,
  ) => {
    // if (!previous[row.id]) {
    //   setPrevious(state => ({ ...state, [row.id]: row }));
    // }
    const value = e.target.value;
    const name = e.target.name;
    const { id } = row;
    const newRows = rows.map((row: any) => {
      if (row.id === id) {
        return { ...row, [name]: value };
      }
      return row;
    });
    // console.log();
    setRows(newRows);
  };

  const onDone = (row: object) => {
    // console.log(row)
    setEditing(!editing);
    patchEvents(row.id, row);
  };

<<<<<<< HEAD
  const onEdit = (row: object) => {
    setEditing(!editing)
    setRowEditing(row.id)
  }

  const onDelete = (row: object) => {
    deleteEvents(row.id)
    setDeleteCount(deleteCount + 1)
  }
=======
  const onEdit = () => {
    setEditing(!editing);
  };

  const onDelete = (row: object) => {
    setDeleteCount(deleteCount + 1);
    deleteEvents(row.id);
  };
>>>>>>> 603a1cc844d3117913aaf20623089d3c122918ec

  return (
    <Paper sx={{ width: '90%', overflow: 'hidden' }}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
                        {(editing && row.id === rowEditing) ? (
                          <Input
                            // type={String}
                            defaultValue={value}
                            name={column.id}
                            onChange={(e) => onChange(e, row)}
                          />
                        ) : column.format && typeof value === 'number' ? (
                          column.format(value)
                        ) : (
                          value
                        )}
                      </TableCell>
                    );
                  })}
                  {(editing && row.id === rowEditing) ? (
                    <DoneIcon onClick={() => onDone(row)} />
                  ) : (
                    <>
                      <TableCell>
                        <EditIcon onClick={() => onEdit(row)} />
                      </TableCell>
                      <TableCell>
                        <DeleteIcon onClick={() => onDelete(row)} />
                      </TableCell>
                    </>
                  )}
<<<<<<< HEAD

=======
>>>>>>> 603a1cc844d3117913aaf20623089d3c122918ec
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

export default EventsRecords;
