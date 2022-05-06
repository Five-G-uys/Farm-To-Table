/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

// React Imports
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// MUI Imports
import { ThemeProvider, createTheme } from '@mui/system';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Navigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';

// Component Imports
import UsersContainer from './UsersContainer';
// import { cli } from 'webpack';

const UserRecordsPage = () => {
  const [updateCounter, setUpdateCounter] = useState(0);
  const [users, setUsers] = useState([]);

  // create a stateful boolean to monitor if updating existing product (in update mode) or creating a new product entry
  const [inEditMode, setInEditMode] = useState(false);

  // create state var for product object
  const [user, setUser] = useState({
    id: 0,
    googleId: '',
    name: '',
    email: '',
    address: '',
    picture: '',
    roleId: 0,
  });

  // state var for backdrop
  const [open, setOpen] = useState(false);

  // handle create form
  const handleCreateForm = () => {
    setOpen(true);
  };

  // Handlers for backdrop control
  const handleClose = () => {
    setOpen(false);
    setInEditMode(false);
    setUser({
      id: 0,
      googleId: '',
      name: '',
      email: '',
      address: '',
      picture: '',
      roleId: 0,
    });
  };
  // const handleToggle = () => {
  // };

  // Box component styles
  const commonStyles = {
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    m: 1,
    // to center elements absolutely inside parent
    // add event listener to window size to resize only when certain size bounds are crossed
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    border: 1,
    padding: '20px',
    borderRadius: '2.5rem',
    boxShadow: 24,

    // width: ,
    // minWidth: 500,
    // minHeight: 500,
    // maxWidth: 1800,
    // maxHeight: 1800,
    // display: 'flex',
  };

  // Destructure product state obj
  const { id, googleId, name, email, address, picture, roleId } = user;

  // create post req to send user form data
  const postUser = (e: any) => {
    // console.log('LINE 108');
    e.preventDefault();
    axios
      .post('/api/users', {
        product: {
          name: name,
          email: email,
          address: address,
          picture: picture,
          roleId: Number(roleId),
        },
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then((data) => {
        console.log('saved!', data);
        setUpdateCounter(updateCounter + 1);
        handleClose();
        // <Navigate to='/admin/edit-products' />; // ???
      })
      .catch((err) => console.error(err));
  };

  // export function to product pages component
  const updateUser = async (userId: number, updatedUser: any) => {
    try {
      // axios always has data property available on response obj so can destructure here
      const { data } = await axios.patch(`/api/users/${userId}`, updateUser);
      console.log('LINE 117 || USER CALLS', data);
      return data;
    } catch (err) {
      console.error('LINE 120 || USER CALLS', err);
      return { error: err };
    }
  };

  // create function to handle update form submission
  const handleUserUpdateSubmit = async (e: any) => {
    e.preventDefault();
    try {
      // call async function that was imported from apiCalls/productCalls
      const result = await updateUser(user.id, user);
      // keep in try so it doesn't rerender on error
      setUpdateCounter(updateCounter + 1);
      handleClose();

      console.log('LINE 135 || USERS PAGE', result);
    } catch (err) {
      console.error('LINE 137 || USERS PAGE ', err);
    }
  };

  // Create input handler for form text
  const handelTextInput = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUser((state) => {
      return {
        ...state,
        [name]: value,
      };
    });
  };

  // get all users handler
  const getAllUsers = () => {
    axios
      .get('/api/users')
      .then((data) => {
        console.log('LINE 161 || GET ALL USERS', data);
        setUsers(data.data);
      })
      .catch((err) => {
        console.error('LINE 165 || GET ALL USERS ERROR');
      });
  };

  // handle click + edit form functionality for edit button in Product Card component
  const handleEditClick = (userId: any) => {
    console.log('LINE 198 || USER PAGE CLICKED', userId);

    const clickedUser: any = users.find(
      // find mutates original array values
      (usr: any) => usr.id === userId
    );

    setUser({
      id: userId,
      googleId: clickedUser.googleId,
      name: clickedUser.name,
      email: clickedUser.email,
      address: clickedUser.address,
      picture: clickedUser.picture,
      roleId: clickedUser.roleId,
    });
    setInEditMode(true);
    setOpen(true);
  };

  // useEffect((): void => {
  //   // don't prevent default here so it gets on page load and all state updates?
  //   getAllUsers();
  // }, [users]);
  useEffect((): void => {
    getAllUsers();
  }, [updateCounter]);

  return (
    <div>
      <UsersContainer
        users={users}
        getAllUsers={getAllUsers}
        handleEditClick={handleEditClick}
        inEditMode={inEditMode}
      />
      {/* <Button onClick={handleToggle}>Show backdrop</Button> */}
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          borderRadius: '2.5rem',
          boxShadow: 24,
        }}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 750,
        }}
        className='add_x_form_modal'
      >
        <Fade in={open}>
          {
            <div>
              <div>
                <Box
                  sx={{
                    ...commonStyles,
                    // flexWrap: 'wrap',
                    // display: 'flex',
                    // justifyContent: 'center',
                    // borderRadius: '16px',
                  }}
                >
                  <form
                    onSubmit={inEditMode ? handleUserUpdateSubmit : postUser}
                  >
                    <br></br>
                    {picture && <img width={300} src={picture} />}
                    <br></br>
                    <FormControl fullWidth sx={{ m: 1 }} variant='standard'>
                      <InputLabel htmlFor='standard-adornment-amount'>
                        Amount
                      </InputLabel>
                      <Input
                        name='name'
                        value={name}
                        id='User Name'
                        // id='fullWidth'
                        placeholder='Avocado'
                        onChange={handelTextInput}
                        startAdornment={
                          <InputAdornment position='start'>$</InputAdornment>
                        }
                      />
                    </FormControl>
                    <TextField
                      // width='75%'
                      // type={{ width: '75%' }}
                      id='filled-basic'
                      variant='filled'
                      // label='Filled'
                      value={name}
                      name='name'
                      label='User Name'
                      // id='fullWidth'
                      placeholder='Avocado'
                      onChange={handelTextInput}
                    />
                    <br></br>
                    <br></br>
                    <TextField
                      fullWidth
                      id='filled-basic'
                      variant='filled'
                      value={email}
                      name='email'
                      label='User Email'
                      // id='fullWidth'
                      placeholder='example@gmail.com'
                      onChange={handelTextInput}
                    />
                    <br></br>
                    <br></br>
                    <TextField
                      fullWidth
                      id='filled-basic'
                      variant='filled'
                      value={address}
                      name='address'
                      label='Delivery Adderss'
                      // id='fullWidth'
                      placeholder='1234 Example Rd / New Orleans / LA / 70117'
                      onChange={handelTextInput}
                    />
                    <br></br>
                    <br></br>
                    <TextField
                      fullWidth
                      id='filled-basic'
                      variant='filled'
                      value={roleId}
                      name='roleId'
                      label='Role Id'
                      // id='fullWidth'
                      placeholder='1 for User / 3 for Employee / 4 for Admin'
                      onChange={handelTextInput}
                    />
                    <br></br>
                    <br></br>
                    <Button variant='contained' size='large' type='submit'>
                      {inEditMode ? 'UPDATE' : 'SAVE'}
                    </Button>
                    <br></br>
                    <br></br>
                  </form>
                </Box>
              </div>
            </div>
          }
        </Fade>
      </Modal>
    </div>
  );
};

export default UserRecordsPage;
