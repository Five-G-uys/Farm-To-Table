// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { Routes, Route, Link, Navigate, Outlet } from "react-router-dom";
import ProductsRecords from "./ProductsRecords";
import { CssBaseline, Box, Container, Typography } from "@mui/material";
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
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Admin Records Table
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            One stop shop for all of our farm records.
          </Typography>
        </Container>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Button
          component={Link}
          to="/records/delivery-zones-records"
          variant="contained"
          color="primary"
        >
          get deliveryZones
        </Button>
        <Button
          component={Link}
          to="/records/events-records"
          variant="contained"
          color="primary"
        >
          get events
        </Button>
        <Button
          component={Link}
          to="/records/orders-records"
          variant="contained"
          color="primary"
        >
          get orders
        </Button>
        <Button
          component={Link}
          to="/records/products-records"
          variant="contained"
          color="primary"
        >
          get products
        </Button>
        <Button
          component={Link}
          to="/records/subscription-entries-records"
          variant="contained"
          color="primary"
        >
          get subscriptionEntries
        </Button>
        <Button
          component={Link}
          to="/records/subscriptions-records"
          variant="contained"
          color="primary"
        >
          get subscriptions
        </Button>
        <Button
          component={Link}
          to="/records/users-records"
          variant="contained"
          color="primary"
        >
          get users
        </Button>
        <Button
          component={Link}
          to="/records/vendors-records"
          variant="contained"
          color="primary"
        >
          get vendors
        </Button>
        <Outlet />
      </Box>
    </div>
  );
};

export default RecordsPage;
