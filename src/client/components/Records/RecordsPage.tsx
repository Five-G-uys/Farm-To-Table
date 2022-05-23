// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { Routes, Route, Link, Navigate, Outlet } from 'react-router-dom';
import ProductsRecords from './ProductsRecords';
import { CssBaseline, Box, Container, Typography } from '@mui/material';
import { Grid } from '@material-ui/core';
// import DietaryRestrictionsRecords from "./DietaryRestrictions/DietaryRestrictionsRecords";
// import DeliveryZones from "./DileveryZones/DeliveryZonesRecords";
// import Events from "./Events/EventsRecords";
// import Farms from "./Farms/FarmsRecords";
// import Orders from "./Orders/OrdersRecords";
// import Products from "./Products/ProductsRecords";
// import Roles from "./Roles/RolesRecords";
// import SubscriptionEntries from "./SubscriptionEntries/SubscriitionEntriesRecords";
// import Subscriptions from "./Subscriptions/SubscriptionsRecords";
// import Users from "./Users/UsersRecords";
// import Vendors from "./Vendors/VendorsRecords";

const RecordsPage = () => {
  // const [deliveryZones, setDeliveryZones] = useState({ deliveryZonesArray: {} });
  // const [dietaryRestrictions, setDietaryRestrictions] = useState({ dietaryRestrictionsArray: {} });
  // const [events, setEvents] = useState({ eventsArray: {} });
  // const [farms, setFarms] = useState({ farmsArray: {} });
  // const [orders, setOrders] = useState({ ordersArray: {} });
  // const [products, setProducts] = useState({ productsArray: {} });
  // const [roles, setRoles] = useState({ rolesArray: {} });
  // const [rsvp, setRSVP] = useState({ rsvpArray: {} });
  // const [subscriptionEntries, setSubscriptionEntries] = useState({ subscriptionEntriesArray: {} });
  // const [subscriptions, setSubscriptions] = useState({ subscriptionsArray: {} });
  // const [users, setUsers] = useState({ usersArray: {} });
  // const [vendors, setVendors] = useState({ vendorsArray: {} });

  return (
    <div>
      <CssBaseline />
      {/* Hero unit */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth='sm'>
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
            color='text.secondary'
            paragraph
          >
            One stop shop for all of our farm records.
          </Typography>
        </Container>
      </Box>
      <Grid container alignItems='center' justifyContent='center'>
        <Button
          component={Link}
          to='/records/delivery-zones-records'
          variant='contained'
          color='primary'
        >
          DeliveryZones
        </Button>
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
          SubscriptionEntries
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
