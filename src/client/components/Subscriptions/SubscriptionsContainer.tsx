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
}: any) => {
  console.log('LINE 5 || PRODUCTSCONTAINER', subscriptions);
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
              getAllSubscriptions={getAllSubscriptions}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default SubscriptionsContainer;

{
  /* <div>
{subArray.map(
  (sub: {
    id: number;
    season: string;
    year: number;
    flat_price: number;
    weekly_price: number;
    description: string;
    start_date: string;
    end_date: string;
    farm_id: 1;
  }) => {
    return (
      <SubscriptionCard
        season={sub.season}
        year={sub.year}
        flat_price={sub.flat_price}
        weekly_price={sub.weekly_price}
        description={sub.description}
        start_date={sub.start_date}
        end_date={sub.end_date}
        key={sub.id}
        subscription_id={sub.id}
      />
    );
  }
)}
</div> */
}
