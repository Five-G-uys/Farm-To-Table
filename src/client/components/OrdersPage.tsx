import React from 'react';
import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

const OrdersPage = () => {
  const [userId, setUserId] = useState(0);

  useEffect((): void => {
    // TAKE THIS AXIOS CALL TO GET USER
    axios
      .get<AxiosResponse>('/api/userProfile')
      .then(({ data }: AxiosResponse) => {
        console.log('LINE 13 || ORDERSPAGE', data);
        const { id }: { id: number } = data;
        setUserId(id);
      })
      .catch((err) => console.warn(err));
  }, []);

  axios.get<AxiosResponse>('/api/userProfile');

  return (
    <div>
      <div>OrdersPage Rendering!</div>
      <div>User ID: {userId}</div>
    </div>
  );
};

export default OrdersPage;
