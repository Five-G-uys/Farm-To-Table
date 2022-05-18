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

const OrdersList = ({ orders }: any) => {
  // console.log(
  //   'LINE 4 || ORDERSLIST ',
  //   orders.sort((a: any, b: any) => a.delivery_date - b.delivery_date)
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
              sm={5}
              md={4}
              lg={3}
              xl={3}
              key={order.delivery_date + order.id}
            >
              <OrderCard order={order} key={order.delivery_date + order.id} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default OrdersList;
