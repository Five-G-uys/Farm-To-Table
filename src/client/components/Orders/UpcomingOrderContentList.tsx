import React from 'react';
import UpcomingOrderContentEntry from './UpcomingOrderContentEntry';

const UpcomingOrderContentList = ({ order, handleDeleteOrderContent }: any) => {
  // if (order.products === undefined) return <div></div>;
  const { products } = order;

  const arrayOfProductIdsInOrder = order.products.map((product: any) => {
    return product.orderContents.productId;
  });

  console.log('LINE 5 || ORDER', order, arrayOfProductIdsInOrder, order.id);
  return (
    <div>
      {products.map((prod: any, i: number) => {
        console.log('LINE 21  || ORDER CONTENT LIST', prod);
        return (
          <UpcomingOrderContentEntry
            product={prod}
            key={order.products[i].id}
            productId={prod.id}
            orderId={order.id}
            delivery_date={order.delivery_date}
            orderContentId={order.products[i].orderContents.id}
            handleDeleteOrderContent={handleDeleteOrderContent}
          />
        );
      })}
    </div>
  );
};

export default UpcomingOrderContentList;
