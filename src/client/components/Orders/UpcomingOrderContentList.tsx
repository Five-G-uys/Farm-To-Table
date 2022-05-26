import React from 'react';
import UpcomingOrderContentEntry from './UpcomingOrderContentEntry';

const UpcomingOrderContentList = ({ order, handleDeleteOrderContent }: any) => {
  // if (order.products === undefined) return <div></div>;
  const { products } = order;

  const arrayOfProductIdsInOrder = order.products.map((product: any) => {
    return product.orderContents.productId;
  });

  console.log('LINE 5 || ORDER', order.products, arrayOfProductIdsInOrder);
  return (
    <div>
      {products.map((prod: any, i: number) => {
        return (
          <UpcomingOrderContentEntry
            product={prod}
            key={order.products[i].id}
            orderContentId={order.products[i].orderContents.id}
            handleDeleteOrderContent={handleDeleteOrderContent}
          />
        );
      })}
    </div>
  );
};

export default UpcomingOrderContentList;
