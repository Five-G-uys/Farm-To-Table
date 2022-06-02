// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import Button from '@mui/material/Button';
import { Link, Outlet } from 'react-router-dom';
import { CssBaseline, Box, Container, Typography } from '@mui/material';
import { Grid } from '@material-ui/core';

const RecordsPage = () => {
  return (
    <div>
      <CssBaseline />
      {/* Hero unit */}
      <Box
        sx={{
          bgcolor: 'transparent',
          pt: 8,
          pb: 6,
        }}
      >
        <Container
          maxWidth='sm'
          sx={{
            padding: '3rem 2rem',
            background: 'rgba(0,0,0,0)',
            backdropFilter: 'blur(3px)',
            borderRadius: '2rem',
            // boxShadow: '0 0 4px 1px rgba(25,25,25,1)',
            boxShadow: 8,
          }}
        >
          <Typography
            component='h1'
            variant='h2'
            align='center'
            color='text.primary'
            gutterBottom
          >
            Admin Records Table
          </Typography>
          <Typography
            variant='h5'
            align='center'
            color='text.primary'
            paragraph
          >
            One stop shop for all of our farm records.
          </Typography>
        </Container>
      </Box>
      <Grid container alignItems='center' justifyContent='center'>
        <Button
          component={Link}
          to='/records/events-records'
          variant='contained'
          color='primary'
        >
          Events
        </Button>
        <Button
          component={Link}
          to='/records/orders-records'
          variant='contained'
          color='primary'
        >
          Orders
        </Button>
        <Button
          component={Link}
          to='/records/products-records'
          variant='contained'
          color='primary'
        >
          Products
        </Button>
        <Button
          component={Link}
          to='/records/subscription-entries-records'
          variant='contained'
          color='primary'
        >
          Subscription Entries
        </Button>
        <Button
          component={Link}
          to='/records/subscriptions-records'
          variant='contained'
          color='primary'
        >
          Subscriptions
        </Button>
        <Button
          component={Link}
          to='/records/users-records'
          variant='contained'
          color='primary'
        >
          Users
        </Button>
        <Button
          component={Link}
          to='/records/vendors-records'
          variant='contained'
          color='primary'
        >
          Vendors
        </Button>
        <Outlet />
      </Grid>
    </div>
  );
};

export default RecordsPage;
