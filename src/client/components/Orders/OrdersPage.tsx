// Import Dependencies
import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
// Component Imports
import OrdersList from './OrdersList';
import OrderContentModal from './OrderContentModal';
import { UserContext } from '../App';
// MUI Imports
import { CssBaseline, Box, Container, Typography } from '@mui/material';

const OrdersPage = ({ getOrders }: any) => {
  const user: { id: number; roleId: number } = useContext(UserContext);
  // console.log('LINE 39 || ORDERSPAGE', user.roleId);
  const id = user.id;
  const roleId = user.roleId;
  // NEED TO MAKE GET REQ ON PAGE RENDER FOR ALL UPCOMING ORDERS ORGANIZED FROM SOONEST TO FURTHEST

  // state var for subscription entry id
  const [subscIds, setSubscIds] = useState([]);
  // state var for orders array
  const [orders, setOrders]: any = useState([]);
  console.log('LINE 47 || ORDERS', id, roleId, orders);
  const [updateCounter, setUpdateCounter] = useState(0);
  const handleUpdateCounter = () => {
    setUpdateCounter(updateCounter + 1);
  };

  // if (id > 1) {
  //   const uniqueDeliveryDateArray: any = [];
  //   setOrders(
  //     orders.filter((order: any) => {
  //       if (uniqueDeliveryDateArray.indexOf(order.delivery_date) === -1) {
  //         uniqueDeliveryDateArray.push(order.delivery_date);
  //         return order;
  //       } else {
  //         return;
  //       }
  //     }),
  //   );
  // }
  // console.log('LINE 59 || ORDERS', orders);

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
        console.log('LINE 29 || ORDERSPAGE ||SUCCESS', data.data); //array of objects
        setOrders(data.data);
      })
      .catch((error: any) => {
        console.log('LINE 68 || ADMIN ORDERSPAGE', error);
      });
  }, [user, updateCounter]);

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

  const handleOrderContentSubmit = (e: any) => {
    // post route to add order contents to database
    e.preventDefault();
    console.log('LINE 124 || ORDER CONTENT SUBMIT HIT');
    //
    axios
      .post('/api/order-content', {
        delivery_date: deliveryDate,
        productsIds: selectedProducts,
      })
      .then((data: any) => {
        console.log('LINE 132 || ORDERSPAGE SUBMIT SUCCESS', data);
        getOrders()
          .then((data: any) => {
            console.log('LINE 29 || ORDERSPAGE ||SUCCESS', data.data); //array of objects
            setOrders(data.data);
          })
          .catch((error: any) => {
            console.log('LINE 68 || ADMIN ORDERSPAGE', error);
          });
      })
      .catch((err: any) => {
        console.error('LINE 135 || ORDERSPAGE || SUBMIT ERROR', err);
      });
  };

  const handleDeleteOrderContent = (
    orderContentId: number,
    productId: number,
    orderId: number,
    delivery_date: string,
  ) => {
    axios
      .delete(
        `/api/order-content/${orderContentId}/${productId}/${orderId}/${delivery_date}`,
      )
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
          bgcolor: 'transparent',
          pt: 8,
          pb: 6,
        }}
      >
        <Container
          maxWidth='sm'
          sx={{
            padding: '3rem 2rem',
            background: 'rgba(0,0,0,0)',
            backdropFilter: 'blur(3px)',
            borderRadius: '2rem',
            // boxShadow: '0 0 4px 1px rgba(25,25,25,1)',
            boxShadow: 8,
          }}
        >
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
            color='text.primary'
            paragraph
          >
            Here are all of your upcoming CSA produce orders. If you'd like to
            change or amend your order, please contact us to let us know.
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
        getOrders={getOrders}
      />
    </div>
  );
};

export default OrdersPage;
