import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
const ProductsPage = () => {
  // create state for product object
  const [product, setProduct] = useState({
    img_url: '',
    name: '',
    description: '',
    plant_date: '',
    harvest_date: '',
    season: '',
  });
  // state var for isClicked boolean
  const [isClicked, setIsClicked] = useState(false);
  // state var for backdrop
  const [open, setOpen] = React.useState(false);

  // handler for isClicked state boolean
  const handelIsClicked = () => {
    setIsClicked(true);
    setOpen(!open);
  };

  // Handlers for backdrop control
  const handleClose = () => {
    setOpen(false);
    setIsClicked(false);
  };
  // const handleToggle = () => {
  // };

  // Box component styles
  const commonStyles = {
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    m: 1,
    // width: 500,
    border: 1,
    // minWidth: 500,
    // minHeight: 500,
    // maxWidth: 1800,
    // maxHeight: 1800,
    // display: 'flex',
  };

  // Destructure product state obj
  const { img_url, name, description, plant_date, harvest_date, season } =
    product;

  // create post req to send product form data
  const postProduct = () => {
    axios
      .post('/api/product', {
        product: {
          name: name,
          description: description,
          img_url: img_url,
          plant_date: plant_date,
          harvest_date: harvest_date,
          season: season,
        },
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then((data) => {
        console.log('saved!', data);
        // <Navigate to='/admin/edit-products' />; // ???
      })
      .catch((err) => console.error(err));
  };

  // Create input handler for form text
  const handelTextInput = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((state) => {
      return {
        ...state,
        [name]: value,
      };
    });
  };

  // Cloudinary handling
  console.log(process.env.CLOUD_PRESET2);
  const CLOUD_NAME = process.env.CLOUD_NAME;
  const CLOUD_PRESET2 = process.env.CLOUD_PRESET2;
  const showWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: CLOUD_NAME,
        uploadPreset: CLOUD_PRESET2,
        folder: name,
        // WE NEED TO CONSIDER ADDING A 2 DIGIT YEAR NUMBER AT THE END OF EACH SEASON TO IDENTIFY
        // AND ACCESS PHOTOS MORE EASILY
        tags: [season],
      },
      (error: any, result: { event: string; info: { url: string } }) => {
        if (!error && result && result.event === 'success') {
          console.log('LINE 56', result.info.url);
          setProduct((state) => {
            return {
              ...state,
              img_url: result.info.url,
            };
          });
          console.log('LINE 63', result.info.url);
        }
      }
    );
    widget.open();
  };

  return (
    <div>
      {/* <Button onClick={handleToggle}>Show backdrop</Button> */}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        {isClicked ? (
          <div>
            <div>
              <Box
                sx={{
                  ...commonStyles,
                  flexWrap: 'wrap',
                  display: 'flex',
                  justifyContent: 'center',
                  borderRadius: '16px',
                }}
              >
                <form onSubmit={postProduct}>
                  <Button
                    variant='contained'
                    size='large'
                    type='submit'
                    onClick={showWidget}
                  >
                    Add Product Image
                  </Button>
                  <br></br>
                  {img_url && <img width={300} src={img_url} />}
                  <br></br>
                  <FormControl fullWidth sx={{ m: 1 }} variant='standard'>
                    <InputLabel htmlFor='standard-adornment-amount'>
                      Amount
                    </InputLabel>
                    <Input
                      name='name'
                      value={name}
                      id='Product Name'
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
                    label='Product Name'
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
                    value={description}
                    name='description'
                    label='Product Description'
                    // id='fullWidth'
                    placeholder='Description'
                    onChange={handelTextInput}
                  />
                  <br></br>
                  <br></br>
                  <TextField
                    fullWidth
                    id='filled-basic'
                    variant='filled'
                    value={plant_date}
                    name='plant_date'
                    label='Plant Date'
                    // id='fullWidth'
                    placeholder='Plant Date'
                    onChange={handelTextInput}
                  />
                  <br></br>
                  <br></br>
                  <TextField
                    fullWidth
                    id='filled-basic'
                    variant='filled'
                    value={harvest_date}
                    name='harvest_date'
                    label='Harvest Date'
                    // id='fullWidth'
                    placeholder='Projected Harvest Date'
                    onChange={handelTextInput}
                  />
                  <br></br>
                  <br></br>
                  <TextField
                    fullWidth
                    id='filled-basic'
                    variant='filled'
                    value={season}
                    name='season'
                    label='Season'
                    // id='fullWidth'
                    placeholder='Season'
                    onChange={handelTextInput}
                  />
                  <br></br>
                  <br></br>
                  <Button variant='contained' size='large' type='submit'>
                    Save
                  </Button>
                  <br></br>
                  <br></br>
                  {/* <button type='submit' className='form--submit'>
                Save Product
              </button> */}
                </form>
              </Box>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </Backdrop>
      <Fab
        onClick={handelIsClicked}
        size='small'
        // color='secondary'
        aria-label='add'
        style={{ transform: 'scale(2.5)', backgroundColor: '#80D55F' }}
        sx={{
          position: 'fixed',
          bottom: (theme) => theme.spacing(5),
          right: (theme) => theme.spacing(5),
        }}
      >
        <AddIcon style={{ color: '#FFFFFF' }} />
      </Fab>
    </div>
  );
};

export default ProductsPage;
