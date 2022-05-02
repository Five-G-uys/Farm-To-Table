/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// React Imports
import React, { useState, useEffect, createContext } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Routes, Route, Navigate, Link } from 'react-router-dom';

// MUI Imports
import HomePage from './HomePage';
import EventCard from './EventCard';
import SubscriptionsPage from './Subscriptions/SubscriptionsPage';
import Confirmation from './Confirmation';
import SubscriptionsAdmin from './Subscriptions/SubscriptionsAdmin';
import OrdersPage from './OrdersPage';
import EventsPage from './EventsPage';
import ProfilePage from './ProfilePage';
import AboutUsPage from './AboutUsPage';
import Login from './Login';
import NewNavBar from './NewNavBar';
import ProductsPage from './ProductsPage';
import RecordsPage from './Records/RecordsPage';
import DileveryZonesRecords from '../components/Records/DileveryZones/DeliveryZonesRecords';
import EventsRecords from '../components/Records/Events/EventsRecords';
import FarmsRecords from '../components/Records/Farms/FarmsRecords';
import OrdersRecords from '../components/Records/Orders/OrdersRecords';
import ProductsRecords from '../components/Records/Products/ProductsRecords';
import SubscriptionEntriesRecords from '../components/Records/SubscriptionEntries/SubscriitionEntriesRecords';
import SubscriptionsRecords from '../components/Records/Subscriptions/SubscriptionsRecords';
import UsersRecords from '../components/Records/Users/UsersRecords';
import VendorsRecords from '../components/Records/Vendors/VendorsRecords';
import DeliveryRoutesPage from './DeliveryRoutes/DeliveryRoutesPage';
import PackingListPage from './PackingListPage';
import UserRecordsPage from './Users/UsersRecordsPage';
import Weather from './Weather';

import { createTheme } from '@mui/material';
//material UI IMPORTS
import { Container, Grid, Paper, Switch } from '@mui/material';
// import { makeStyles } from "@mui/styles";
// import Paper from "@material-ui/core/Paper";
// import { Switch, useTheme } from "@material-ui/core";
// import useMediaQuery from "@material-ui/core/useMediaQuery";
import { ThemeProvider } from '@mui/material';
import { Typography } from '@mui/material';

// const useStyles = makeStyles((theme: any) => ({
//   root: {
//     width: "100%",
//     height: "100%",
//     [theme.breakpoints.down("xs")]: { paddingTop: theme.spacing(2) },
//   },
// }));

export const UserContext: any = createContext(null);

const App = () => {
  const [user, setUser] = useState({});
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);

  navigator.geolocation.getCurrentPosition(function (position) {
    //returns lat/lon based on user location
    setLat(position.coords.latitude + 0.000001);
    setLon(position.coords.longitude + 0.000001);
  });
  //const [theme, setTheme] = React.useState("light");

  const [mode, setMode] = useState(false);
  const theme = createTheme({
    palette: {
      mode: mode ? 'light' : 'dark',
    },
  });
  // const toggleTheme = () => {
  //   setTheme((curr) => (curr === "light" ? "dark" : "light"));
  // };

  useEffect((): void => {
    // TAKE THIS AXIOS CALL TO GET USER
    axios
      .get('/auth/api/userProfile')
      .then(({ data }: AxiosResponse) => {
        // console.log('LINE 30 || APP COMPONENT', data);
        setUser(data);
      })
      .catch((err) => console.warn(err)); //
  }, []);

  ////********************DARK MODE HERE *********************////
  // The light theme is used by default
  // const [isDarkTheme, setIsDarkTheme] = useState(false);

  const isLoggedIn = (user: any) => user.role_id > 0;
  const isEmployee = (user: any) => user.role_id > 2;
  const isAdmin = (user: any) => user.role_id > 3;

  return (
    <>
      <ThemeProvider theme={theme}>
        <Paper sx={{ height: '100vh' }} variant='outlined' square>
          <Container>
            <Typography variant='h4' component='h5'>
              Change the Theme
            </Typography>
            <Grid item xs={4} spacing={2}>
              <Paper sx={{ padding: '5px' }} elevation={5}>
                <NewNavBar user={user} />
                <Switch onClick={() => setMode(!mode)}></Switch>
              </Paper>
              <div>
                <h1>{user.role_id}</h1>
                <UserContext.Provider value={user}>
                  <Routes>
                    {/* Login/Logout Routes */}
                    <Route
                      path='/login'
                      element={
                        isLoggedIn(user) ? (
                          <Navigate to='/profile-page' />
                        ) : (
                          <Login />
                        )
                      }
                    />

                    {/* General Routes */}
                    <Route path='/' element={<HomePage />} />
                    <Route path='/about-us-page' element={<AboutUsPage />} />
                    <Route
                      path='/subscriptions-page'
                      element={<SubscriptionsPage />}
                    />
                    <Route path='/events-page' element={<EventsPage />} />
                    <Route path='/edit-products' element={<ProductsPage />} />
                    <Route
                      path='/weather-page'
                      element={<Weather lat={lat} lon={lon} />}
                    />

                    {/* Restricted User Routes */}
                    <Route
                      path='/profile-page'
                      element={
                        isLoggedIn(user) ? (
                          <ProfilePage />
                        ) : (
                          <Navigate to='/login' />
                        )
                      }
                    />
                    <Route
                      path='/subscriptions-page/confirmation-page'
                      element={
                        isLoggedIn(user) ? (
                          <Confirmation />
                        ) : (
                          <Navigate to='/login' />
                        )
                      }
                    />
                    <Route
                      path='/orders-page'
                      element={
                        isLoggedIn(user) ? (
                          <OrdersPage />
                        ) : (
                          <Navigate to='/login' />
                        )
                      }
                    />
                    {/* Restricted Employ Routes */}
                    <Route
                      path='/delivery-routes'
                      element={
                        isEmployee(user) ? (
                          <DeliveryRoutesPage lat={lat} lon={lon} />
                        ) : (
                          <Navigate to='/login' />
                        )
                      }
                    />
                    <Route
                      path='/packing-lists'
                      element={
                        isEmployee(user) ? (
                          <PackingListPage />
                        ) : (
                          <Navigate to='/login' />
                        )
                      }
                    />
                    {/* Restricted Admin Routes */}

                    <Route
                      path='/edit-users'
                      element={
                        isAdmin(user) ? (
                          <UserRecordsPage />
                        ) : (
                          <Navigate to='/profile-page' />
                        )
                      }
                    />
                    <Route
                      path='/subscriptions-admin'
                      element={
                        isAdmin(user) ? (
                          <SubscriptionsAdmin />
                        ) : (
                          <Navigate to='/subscriptions-page' />
                        )
                      }
                    />
                    <Route path='records' element={<RecordsPage />}>
                      <Route
                        path='products-records'
                        element={<ProductsRecords />}
                      />
                    </Route>

                    <Route path='dileveryZones-records' element={<DileveryZonesRecords />} />
                    <Route path='events-records' element={<EventsRecords />} />
                    <Route path='farms-records' element={<FarmsRecords />} />
                    <Route path='orders-records' element={<OrdersRecords />} />
                    <Route path='products-records' element={<ProductsRecords />} />
                    <Route path='subscription-entries-records' element={<SubscriptionEntriesRecords />} />
                    <Route path='subscriptions-records' element={<SubscriptionsRecords />} />
                    <Route path='users-records' element={<UsersRecords />} />
                    <Route path='vendors-records' element={<VendorsRecords />} />
                    <Route path='/records' element={
                        isAdmin(user) ? (
                          <RecordsPage />
                        ) : (
                          <Navigate to='/profile-page' />
                        )
                      }
                    />
                  </Routes>
                </UserContext.Provider>
              </div>
            </Grid>
          </Container>
        </Paper>
      </ThemeProvider>
    </>
  );
};

export default App;
