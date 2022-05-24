// React Imports
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// MUI Imports
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import Fade from '@mui/material/Fade';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import {
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Stack,
} from '@mui/material';

// Component Imports
import ProductsContainer from './ProductsContainer';
import { updateProduct } from './productCallS';

const ProductsPage = () => {
  const [updateCounter, setUpdateCounter] = useState(0);

  // cerate state var Products array (set to result of get req)
  const [products, setProducts] = useState([]);

  // create a stateful boolean to monitor if updating existing product (in update mode) or creating a new product entry
  const [inEditMode, setInEditMode] = useState(false);

  // create stateful boolean to monitor if product availability is changed
  const [isClicked, setIsClicked] = useState(true);

  // create state var for product object
  const [product, setProduct] = useState({
    id: 0,
    img_url: '',
    name: '',
    description: '',
    quantity: '',
    // plant_date: '',
    harvest_dates: '',
    // subscriptionId: '',
    available: true,
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
    setProduct({
      id: 0,
      img_url: '',
      name: '',
      description: '',
      quantity: '',
      // plant_date: '',
      harvest_dates: '',
      // subscriptionId: '',
      available: true,
    });
  };

  // Box component styles
  const commonStyles = {
    width: '40vw',
    minWidth: '500px',
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
  const {
    img_url,
    name,
    description,
    quantity,
    // plant_date,
    harvest_dates,
    // subscriptionId,
    available,
  } = product;

  // create post req to send product form data
  const postProduct = (e: any) => {
    // console.log('LINE 108');
    e.preventDefault();
    axios
      .post('/api/products', {
        product: {
          name: name,
          description: description,
          quantity: quantity,
          img_url: img_url
            ? img_url
            : 'http://res.cloudinary.com/ddg1jsejq/image/upload/v1651189122/dpzvzkarpu8vjpwjsabd.jpg',
          // // plant_date: plant_date,
          harvest_dates: harvest_dates,
          // // subscriptionId: Number(subscriptionId),
          available: available,
        },
      })
      .catch((err) => {
        console.log('LINE 124: ', err);
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then((data) => {
        // console.log('saved!', data);
        setUpdateCounter(updateCounter + 1);
        toast.success('Product Created', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        handleClose();
        // <Navigate to='/admin/edit-products' />; // ???
      })
      .catch((err) => {
        console.log('LINE 134: ', err);
      });
  };

  // create function to handle update form submission
  const handleProductUpdateSubmit = async (e: any) => {
    e.preventDefault();
    try {
      // call async function that was imported from apiCalls/productCalls
      const result = await updateProduct(product.id, product);
      // keep in try so it doesn't rerender on error
      setUpdateCounter(updateCounter + 1);
      handleClose();

      // console.log('LINE 130 || PRODUCTS PAGE', result);
    } catch (err) {
      console.error('LINE 132 || PRODUCTS PAGE ', err);
    }
  };

  // Create input handler for form text
  const handelTextInput = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProduct((state) => {
      return {
        ...state,
        [name]: value,
      };
    });
  };

  // Create input handler for availability checkbox
  const handleAvailabilityChange = (e: any) => {
    console.log('LINE 83 || PRODUCTSPAGE', e.target.checked);
    setProduct((state) => {
      return {
        ...state,
        available: e.target.checked,
      };
    });
  };

  ///////////////////////////////////////////////// CONSOLIDATE ALL CLOUDINARY HANDLING
  // Cloudinary handling
  // console.log(process.env.CLOUD_PRESET2);
  const CLOUD_NAME = process.env.CLOUD_NAME;
  const CLOUD_PRESET2 = process.env.CLOUD_PRESET2;
  const showWidget = () => {
    // console.log('LINE 115 || CLOUDINARY');
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: CLOUD_NAME,
        uploadPreset: CLOUD_PRESET2,
        folder: name,
        // WE NEED TO CONSIDER ADDING A 2 DIGIT YEAR NUMBER AT THE END OF EACH SEASON TO IDENTIFY
        // AND ACCESS PHOTOS MORE EASILY
        // tags: [subscriptionId],
      },
      (error: any, result: { event: string; info: { url: string } }) => {
        if (!error && result && result.event === 'success') {
          // console.log('LINE 56', result.info.url);
          setProduct((state) => {
            return {
              ...state,
              img_url: result.info.url,
            };
          });
          // console.log('LINE 63', result.info.url);
        }
        // console.log('LINE 135 || CLOUDINARY', error);
      },
    );
    widget.open();
  };

  // get all products handler
  const getAllProducts = () => {
    axios
      .get('/api/products')
      .then((data) => {
        // console.log('LINE 165 || GET ALL PRODUCTS', data);
        // set products state to allProducts array
        setProducts(data.data);
      })
      .catch((err) => {
        console.error('LINE 170 || GET ALL PRODUCTS ERROR');
      });
  };

  // handle click + edit form functionality for edit button in Product Card component
  const handleEditClick = (productId: any) => {
    // console.log('LINE 185 || PRODUCTS PAGE CLICKED', productId);

    const clickedProduct: any = products.find(
      // find mutates original array values
      (prod: any) => prod.id === productId,
    );
    clickedProduct.img_url = clickedProduct.img_url
      ? clickedProduct.img_url
      : 'http://res.cloudinary.com/ddg1jsejq/image/upload/v1651189122/dpzvzkarpu8vjpwjsabd.jpg';
    // delete clickedProduct.updatedAt;
    // delete clickedProduct.createdAt;
    // delete clickedProduct.id;

    setProduct({
      id: productId,
      img_url: clickedProduct.img_url,
      name: clickedProduct.name,
      description: clickedProduct.description,
      quantity: clickedProduct.quantity,
      // // plant_date: clickedProduct.plant_date,
      harvest_dates: clickedProduct.harvest_dates,
      // // subscriptionId: clickedProduct.subscriptionId,
      available: clickedProduct.available,
    });
    setInEditMode(true);
    setOpen(true);
  };

  useEffect((): void => {
    getAllProducts();
  }, [updateCounter]);

  return (
    <div>
      <CssBaseline />
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Hero unit */}
      <Box
        sx={{
          bgcolor: 'transparent',
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth='sm'>
          <Typography
            component='h1'
            variant='h2'
            align='center'
            color='text.primary'
            gutterBottom
          >
            Farm Products
          </Typography>
          <Typography
            variant='h5'
            align='center'
            color='text.secondary'
            paragraph
          >
            Discover all of our farm fresh goodies, from eggplants to okra and
            squash to tomatoes. They're all ready to be delivered to your
            doorstep each week. Sign up today!
          </Typography>
        </Container>
      </Box>
      <ProductsContainer
        products={products}
        getAllProducts={getAllProducts}
        handleEditClick={handleEditClick}
        inEditMode={inEditMode}
        updateCounter={updateCounter}
        setUpdateCounter={setUpdateCounter}
      />
      {/* <Button onClick={handleToggle}>Show backdrop</Button> */}
      <Modal
        disableScrollLock={true}
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
        <Fade in={open} timeout={{ appear: 300, enter: 300, exit: 400 }}>
          {
            <Box
              sx={{
                ...commonStyles,
                maxHeight: '90vh',
                flexWrap: 'wrap',
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'scroll',
              }}
            >
              <form
                onSubmit={inEditMode ? handleProductUpdateSubmit : postProduct}
              >
                {img_url && (
                  <img width={'100%'} src={img_url} border-radius='2rem' />
                )}
                <Box>
                  <FormControl fullWidth sx={{ m: 1 }} variant='standard'>
                    {' '}
                    <FormLabel>
                      <h3 className='create-product'>Create Product</h3>
                    </FormLabel>
                  </FormControl>
                </Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={available}
                      onChange={handleAvailabilityChange}
                    />
                  }
                  label='Available'
                />

                <TextField
                  // width='75%'
                  // type={{ width: '75%' }}
                  fullWidth
                  border-radius='1rem'
                  id='fullWidth'
                  variant='filled'
                  // label='Filled'
                  value={name}
                  name='name'
                  label='Product Name'
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
                  label='Description'
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
                  value={quantity}
                  name='quantity'
                  label='Quantity'
                  // id='fullWidth'
                  placeholder='Quantity'
                  onChange={handelTextInput}
                />
                {/*
                    <br></br>
                    <br></br>
                     <TextField
                      fullWidth
                      id='filled-basic'
                      variant='filled'
                      // value={plant_date}
                      // name='plant_date'
                      label='Plant Date'
                      // id='fullWidth'
                      placeholder='Plant Date'
                      onChange={handelTextInput}
                    /> */}
                <br></br>
                <br></br>
                <TextField
                  fullWidth
                  id='filled-basic'
                  variant='filled'
                  value={harvest_dates}
                  name='harvest_dates'
                  label='Harvest Date'
                  // id='fullWidth'
                  placeholder='Projected Harvest Date'
                  onChange={handelTextInput}
                />
                <br></br>
                <br></br>

                <Stack direction='row' justifyContent='space-between'>
                  <Button
                    variant='text'
                    size='medium'
                    onClick={showWidget}
                    sx={{ color: 'green' }}
                  >
                    Add Product Image
                  </Button>
                  <Button
                    variant='text'
                    size='large'
                    type='submit'
                    sx={{ color: 'green' }}
                  >
                    {inEditMode ? 'UPDATE' : 'SAVE'}
                  </Button>
                </Stack>
                {/* <button type='submit' className='form--submit'>
                Save Product
              </button> */}
              </form>
            </Box>
          }
        </Fade>
      </Modal>
      <Fab
        onClick={handleCreateForm}
        size='large'
        // color='secondary'
        aria-label='add'
        style={{
          transform: 'scale(1.5)',
          backgroundColor: '#e2f2d9',
        }}
        sx={{
          position: 'fixed',
          bottom: (theme) => theme.spacing(8),
          right: (theme) => theme.spacing(8),
        }}
        className='texture2'
      >
        <AddIcon style={{ color: 'text.primary' }} />
      </Fab>
    </div>
  );
};

export default ProductsPage;
