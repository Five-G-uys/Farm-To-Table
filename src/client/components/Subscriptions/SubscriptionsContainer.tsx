/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import SubscriptionCard from './SubscriptionCard';
import { Grid } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  gridContainer: {
    paddingTop: '40px',
    paddingLeft: '4rem',
    paddingRight: '4rem',
  },
});

const SubscriptionsContainer = ({
  subscriptions,
  getAllSubscriptions,
  handleEditClick,
  inEditMode,
  handleAddressForm,
  subscription,
  deleteSubscription,
}: any) => {
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={4}
      className={classes.gridContainer}
      // justify='center'
    >
      {subscriptions.map((sub: any) => {
        return (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={3}
            key={sub.season + sub.id}
          >
            <SubscriptionCard
              sub={sub}
              key={sub.season + sub.id}
              handleEditClick={handleEditClick}
              inEditMode={inEditMode}
              subscription={subscription}
              subscriptions={subscriptions}
              getAllSubscriptions={getAllSubscriptions}
              handleAddressForm={handleAddressForm}
              deleteSubscription={deleteSubscription}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default SubscriptionsContainer;
