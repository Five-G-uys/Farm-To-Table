/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

import OrdersList from './OrdersList';
import { UserContext } from './App';
import { CssBaseline, Box, Container, Typography } from '@mui/material';

const OrdersPage = () => {
  const user: any = useContext(UserContext);
  const id: any = user.id;
  // NEED TO MAKE GET REQ ON PAGE RENDER FOR ALL UPCOMING ORDERS ORGANIZED FROM SOONEST TO FURTHEST

  // state var for subscription entry id
  const [subscIds, setSubscIds] = useState([]);
  // state var for orders array
  const [orders, setOrders] = useState([]);

  useEffect((): void => {
    axios
      .get(`/api/upcoming_orders/${id}`, { params: { id } })
      .then((data: any) => {
        // console.log('LINE 29 || ORDERSPAGE ||SUCCESS', data.data); //array of objects
        setOrders(data.data);
      })
      .catch((error: any) => {
        console.log('LINE 29 || ORDERSPAGE', error);
      });
  }, []);

  // axios
  //   .get(`/upcoming_orders/${id}`, { params: { id } })
  //   .then((data: any) => {
  //     console.log('LINE 29 || ORDERSPAGE ||SUCCESS', data.data); //array of objects
  //     setOrders(data.data);
  //   })
  //   .catch((error: any) => {
  //     console.log('LINE 29 || ORDERSPAGE', error);
  //   });

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
              Here are all your upcoming CSA produce orders. If you'd like to change or add to your order please contact us to let us know.
            </Typography>
          </Container>
        </Box>
      <OrdersList orders={orders} />
    </div>
  );
};

export default OrdersPage;
