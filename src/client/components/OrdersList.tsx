import React from 'react';
import OrderCard from './OrderCard';

const OrdersList = ({ orders }: any) => {
  console.log(
    'LINE 4 || ORDERSLIST ',
    orders.sort((a: any, b: any) => a.id - b.id)
  );

  return (
    <div>
      {orders.map((order: any) => {
        return <OrderCard order={order} key={order.delivery_date + order.id} />;
      })}
    </div>
  );
};

export default OrdersList;
