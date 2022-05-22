// Import Dependencies
import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

// Component Imports
import OrdersList from './OrdersList';
import OrderContentModal from './OrderContentModal';
import { UserContext } from './App';

// MUI Imports
import { ThemeProvider, createTheme } from '@mui/system';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Navigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Divider from '@mui/material/Divider';
import {
  CssBaseline,
  Box,
  Container,
  Typography,
  Slide,
  Stack,
} from '@mui/material';

const OrdersPage = ({ getOrders }: any) => {
  const user: { id: number; roleId: number } = useContext(UserContext);
  // console.log('LINE 39 || ORDERSPAGE', user.roleId);
  const id = user.id;
  // NEED TO MAKE GET REQ ON PAGE RENDER FOR ALL UPCOMING ORDERS ORGANIZED FROM SOONEST TO FURTHEST

  // state var for subscription entry id
  const [subscIds, setSubscIds] = useState([]);
  // state var for orders array
  const [orders, setOrders]: any = useState([]);

  let upcomingOrderId: number;
  if (orders.length) {
    upcomingOrderId = orders[0].id && orders[0].id;
  }
  // ORDER CONTENT MODAL VARS
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [products, setProducts] = useState([
    { name: 'Apple', id: 1 },
    { name: 'Orange', id: 2 },
    { name: 'Lemon', id: 3 },
  ]);
  const [selectedProducts, setSelectedProducts]: any = useState([]);

  // STATE VAR FOR UPCOMING ORDER CONTENTS
  const [upcomingOrderContents, setUpcomingOrderContents]: any = useState([]);

  useEffect((): void => {
    // put if condition if user is undefined exit useeffect
    if (!user.id) return;
    // get orders based on user role (user or admin);
    getOrders(id)
      .then((data: any) => {
        // console.log('LINE 29 || ORDERSPAGE ||SUCCESS', data.data); //array of objects
        setOrders(data.data);
      })
      .catch((error: any) => {
        console.log('LINE 68 || ADMIN ORDERSPAGE', error);
      });
  }, [user]);

  const handleSelectedProductsChange = (event: any) => {
    // console.log('LINE 75 || ORDERSPAGE', event.target.checked);
    // console.log('LINE 76 || ORDERSPAGE', event.target);

    // WANT TO MAKE ENTIRE ORDERCONTENTPRODUCTCARD ABLE TO CHANGE CHECKBOX

    if (event.target.checked) {
      // if checked add product to selected products
      // SHOULD SEE TRUE IF CHECKED
      console.log('LINE 86 || ORDERSPAGE', event.target.checked);
      setSelectedProducts([...selectedProducts, event.target.name]);
    } else {
      // remove product from selected products arr
      // SHOULD SEE FALSE IF UNCHECKED
      setSelectedProducts(
        selectedProducts.filter(
          (product: any) => product !== event.target.name,
        ),
      );
    }
  };

  const handleEditClick = (date: any) => {
    console.log('LINE 96 || PRODUCTS PAGE CLICKED');
    const clickedDate: any = orders.find(
      // find mutates original array values
      (order: any) => order.delivery_date === date,
    );
    setDeliveryDate(clickedDate.delivery_date);
    setOpen(true);
  };

  const getAllAvailableProducts = () => {
    // console.log('LINE 102 || GET AVAIABLE PRODUCTS');
    if (user.roleId === 4) {
      // console.log('LINE 104 || GET AVAIABLE PRODUCTS');
      axios
        .get('/api/availableProducts')
        .then((data: any) => {
          // console.log('LINE 106 || AVAILABLE PRODUCTS', data.data);
          setProducts(data.data);
        })
        .catch((err: any) => {
          console.error('LINE 109 || AVAILABLE PRODUCTS ERROR', err);
        });
    }
  };

  const handleOrderContentSubmit = () => {
    // post route to add order contents to database
    console.log('LINE 124 || ORDER CONTENT SUBMIT HIT');
    //
    axios
      .post('/api/order-content', {
        delivery_date: deliveryDate,
        productsIds: selectedProducts,
      })
      .then((data: any) => {
        console.log('LINE 132 || ORDERSPAGE SUBMIT SUCCESS', data);
      })
      .catch((err: any) => {
        console.error('LINE 135 || ORDERSPAGE || SUBMIT ERROR', err);
      });
  };

  const handleDeleteOrderContent = (orderContentId: number) => {
    axios
      .delete(`/api/order-content/${orderContentId}`)
      .then((data: any) => {
        console.log('LINE 148 || ORDER CONTENT DELETE SUCCESS', data);
      })
      .catch((err: any) => {
        console.error('LINE 153|| ORDER CONTENT DELETE ERROR', err);
      });
  };

  useEffect(() => {
    getAllAvailableProducts();
    // getUpcomingOrderContents();
  }, [user.id, orders]);

  return (
    <div>
      <CssBaseline />
      {/* Hero unit */}
      <Box
        sx={{
          bgcolor: 'background.paper',
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
            Upcoming Orders
          </Typography>
          <Typography
            variant='h5'
            align='center'
            color='text.secondary'
            paragraph
          >
            Here are all your upcoming CSA produce orders. If you'd like to
            change or add to your order please contact us to let us know.
          </Typography>
        </Container>
      </Box>
      <OrdersList
        orders={orders}
        handleEditClick={handleEditClick}
        handleDeleteOrderContent={handleDeleteOrderContent}
      />
      <OrderContentModal
        orders={orders}
        open={open}
        handleClose={handleClose}
        handleOpen={handleOpen}
        products={products}
        deliveryDate={deliveryDate}
        handleSelectedProductsChange={handleSelectedProductsChange}
        handleOrderContentSubmit={handleOrderContentSubmit}
      />
    </div>
  );
};

export default OrdersPage;
