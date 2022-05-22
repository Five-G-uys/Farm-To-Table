/* eslint-disable @typescript-eslint/no-explicit-any */
// React Imports
import { ClassNames } from '@emotion/react';

// Component Imports
import React from 'react';
import OrderCard from './OrderCard';

// MUI Imports
import { Grid } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  gridContainer: {
    paddingTop: '60px',
    justifyContent: 'center',
    paddingLeft: '5vw',
    paddingRight: '5vw',
  },
});

const OrdersList = ({
  orders,
  handleOpen,
  handleEditClick,
  handleDeleteOrderContent,
}: any) => {
  // console.log(
  //   'LINE 4 || ORDERSLIST ',
  //   orders,
  //   // orders.sort((a: any, b: any) => a.id - b.id),
  // );
  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={6} className={classes.gridContainer}>
        {orders.map((order: any) => {
          return (
            <Grid
              item
              xs={10}
              sm={6}
              md={5}
              lg={4}
              xl={3}
              key={order.delivery_date + order.id}
            >
              <OrderCard
                order={order}
                handleOpen={handleOpen}
                key={order.delivery_date + order.id}
                handleEditClick={handleEditClick}
                handleDeleteOrderContent={handleDeleteOrderContent}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default OrdersList;
