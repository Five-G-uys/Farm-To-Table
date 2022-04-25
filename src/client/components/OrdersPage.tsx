import React from 'react';
import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

import OrdersList from './OrdersList';

const OrdersPage = () => {
  const [id, setId] = useState(0);
  // NEED TO MAKE GET REQ ON PAGE RENDER FOR ALL UPCOMING ORDERS ORGANIZED FROM SOONEST TO FURTHEST

  // state var for subscription entry id
  const [subscIds, setSubscIds] = useState([]);
  // state var for orders array
  const [orders, setOrders] = useState([]);

  useEffect((): void => {
    // TAKE THIS AXIOS CALL TO GET USER
    // NO!!! NEED TO MAKE GET REQUEST TO GET SUBSCRIPTION ENTRY ID
    axios
      .get<AxiosResponse>('/api/userProfile')
      .then(({ data }: AxiosResponse) => {
        console.log('LINE 22 || ORDERSPAGE', data);
        const { id }: { id: number } = data;
        setId(id);
      })
      .then(() => {
        axios
          .get(`/api/upcoming_orders/${id}`, { params: { id } })
          .then((data: any) => {
            console.log('LINE 29 || ORDERSPAGE ||SUCCESS', data.data); //array of objects
            setOrders(data.data);
          })
          .catch((error: any) => {
            console.log('LINE 29 || ORDERSPAGE', error);
          });
      })
      .catch((err) => console.warn(err));
  }, [id]);

  // axios
  //   .get(`/api/upcoming_orders/${id}`, { params: { id } })
  //   .then((data: any) => {
  //     console.log('LINE 29 || ORDERSPAGE ||SUCCESS', data.data); //array of objects
  //     setOrders(data.data);
  //   })
  //   .catch((error: any) => {
  //     console.log('LINE 29 || ORDERSPAGE', error);
  //   });

  return (
    <div>
      <div>OrdersPage Rendering!</div>
      <div>User ID: {id}</div>
      <OrdersList orders={orders} />
    </div>
  );
};

export default OrdersPage;
