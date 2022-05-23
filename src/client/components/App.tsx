/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// React Imports
import React, { useState, useEffect, createContext } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Routes, Route, Navigate, Link } from 'react-router-dom';

// MUI Imports
import HomePage from './HomePage';
import DeliveryPage from './DeliveryPage';
import SubscriptionsPage from './Subscriptions/SubscriptionsPage';
import SubscriptionsAdmin from './Subscriptions/SubscriptionsAdmin';
import OrdersPage from './OrdersPage';
import EventsPage from './EventsPage';
import ProfilePage from './Profile/ProfilePage';
import AboutUsPage from './AboutUsPage';
import Login from './Login';
import NewNavBar from './NewNavBar';
import ProductsPage from './ProductsPage';
import RecordsPage from './Records/RecordsPage';
import DileveryZonesRecords from './Records/DeliveryZonesRecords';
import EventsRecords from './Records/EventsRecords';
// import FarmsRecords from './Records/FarmsRecords';
import OrdersRecords from './Records/OrdersRecords';
import ProductsRecords from './Records/ProductsRecords';
import SubscriptionEntriesRecords from './Records/SubscriptionEntriesRecords';
import SubscriptionsRecords from './Records/SubscriptionsRecords';
import UsersRecords from './Records/UsersRecords';
import VendorsRecords from './Records/VendorsRecords';
import PackingListPage from './PackingListPage';
import UserRecordsPage from './Users/UsersRecordsPage';
import Weather from './Weather';
//import Image from "src/client/components/groundImage.png";

//material UI IMPORTS
import { Box, createTheme, PaletteMode } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import { Typography } from '@mui/material';
import {
  amber,
  blueGrey,
  grey,
  lightBlue,
  orange,
  lightGreen,
} from '@mui/material/colors';

import { Dispatch, SetStateAction } from 'react';

// import { useEventListener } from "usehooks-ts";
import useMediaQuery from '@material-ui/core/useMediaQuery';

function Copyright() {
  return (
    <Typography variant='body2' color='text.secondary' align='center'>
      {'Copyright © www.knockknocktomatoes.com'} {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export const UserContext: any = createContext(null);

const App = () => {
  const [user, setUser]: any = useState({});
  const [lat, setLat]: any = useState(null);
  const [lon, setLon]: any = useState(null);

  navigator.geolocation.getCurrentPosition(function (position) {
    //returns lat/lon based on user location
    setLat(position.coords.latitude + 0.000001);
    setLon(position.coords.longitude + 0.000001);
  });

  const updateCoords: any = (newLat: any, newLon: any) => {
    setLat(newLat);
    setLon(newLon);
  };

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
  const [mode, setMode] = React.useState<PaletteMode>('light');
  //Not functional yet
  const image = 'https://www.transparenttextures.com/patterns/asfalt-dark.png';
  const styles = {
    paperContainer: {
      backgroundImage: `url(${image})`,
    },
  };

  const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // palette values for light mode
            primary: amber,
            divider: amber[200],
            background: {
              default: '#F6FAFF',
              //rgba(246, 250, 255, 0.9),
              // backdrop-filter: blur(8px),
              //backgroundImage: `url(${image})`,
            },
            text: {
              primary: blueGrey[700],
              secondary: grey[800],
              // action: {
              //   active: lightBlue[200],
              //   activeOpacity: 1,
              //   hover: grey[100],
              //   hoverOpacity: 0.7,
              //   focus: grey[600],
              //   focusOpacity: 1,
              //   selected: grey[300],
              //   selectedOpacity: 1,
              // },
            },
          }
        : {
            // palette values for dark mode
            primary: blueGrey,
            divider: blueGrey[800],
            background: {
              default: blueGrey[900],
              paper: blueGrey[900],
            },
            text: {
              primary: '#fff',
              secondary: grey[500],
            },
          }),
    },
  });

  /////////////////Local Storage for Darkmode/ LightMode////////////////////////////
  // Set dark mode based on media query

  useEffect(() => {
    const mode = window.localStorage.getItem('mode');
    // set mode
    if (mode !== null) {
      setMode(mode === 'dark' ? 'light' : 'dark');
    }
  }, []);

  // Update the theme only if the mode changes
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const changeMode = (newMode: any) => {
    //console.log(window.localStorage.setItem("mode", newMode));
    window.localStorage.setItem('mode', newMode);
    setMode((newMode) => (newMode === 'dark' ? 'light' : 'dark'));
  };

  const isLoggedIn = (user: any) => user.roleId > 0;
  const isEmployee = (user: any) => user.roleId > 2;
  const isAdmin = (user: any) => user.roleId > 3;

  return (
    <>
      {/* <div>
      </div> */}
      {/* <ColorModeContext.Provider value={colorMode}> */}
      <ThemeProvider theme={theme}>
        <NewNavBar
          className='newNavBar'
          user={user}
          mode={mode}
          changeMode={changeMode}
        />
        {/* <Paper sx={{ height: '100%' }}> */}
        {/* <Container>
            <Grid
              container
              alignItems='center'
              style={{ minHeight: '100vh' }}
              // justifyContent='left'
              // item
              xs={4}
            > */}
        <div>
          <UserContext.Provider value={user}>
            <Routes>
              {/* Login/Logout Routes */}
              <Route
                path='/login'
                element={
                  isLoggedIn(user) ? <Navigate to='/profile-page' /> : <Login />
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
                  isLoggedIn(user) ? <ProfilePage /> : <Navigate to='/login' />
                }
              />
              {/* <Route
                path='/subscriptions-page/confirmation-page'
                element={
                  isLoggedIn(user) ? <Confirmation /> : <Navigate to='/login' />
                }
              /> */}
              <Route
                path='/orders-page'
                element={
                  <OrdersPage
                    getOrders={(id: any) =>
                      axios.get(`/api/upcoming_orders/${id}`, {
                        params: { id },
                      })
                    }
                  />
                  // isLoggedIn(user) ? <OrdersPage /> : <Navigate to="/login" />
                }
              />
              <Route
                path='/manage-orders'
                element={
                  <OrdersPage
                    getOrders={() => axios.get(`/api/order/deliveries`)}
                  />
                  // isLoggedIn(user) ? <OrdersPage /> : <Navigate to="/login" />
                }
              />
              {/* Restricted Employ Routes */}
              <Route
                path='/delivery-map'
                element={
                  <DeliveryPage
                    mode={mode}
                    updateCoords={updateCoords}
                    lat={lat}
                    lon={lon}
                  />
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
              <Route path='/records' element={<RecordsPage />}>
                <Route path='products-records' element={<ProductsRecords />} />
                <Route path='vendors-records' element={<VendorsRecords />} />
                <Route
                  path='delivery-zones-records'
                  element={<DileveryZonesRecords />}
                />
                <Route path='events-records' element={<EventsRecords />} />
                <Route path='orders-records' element={<OrdersRecords />} />
                <Route path='products-records' element={<ProductsRecords />} />
                <Route
                  path='subscription-entries-records'
                  element={<SubscriptionEntriesRecords />}
                />
                <Route
                  path='subscriptions-records'
                  element={<SubscriptionsRecords />}
                />
                <Route path='users-records' element={<UsersRecords />} />
              </Route>
              <Route
                path='/records'
                element={
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
        {/* Footer */}
        <Box sx={{ bgcolor: 'background.paper', p: 6 }} component='footer'>
          <Typography variant='h6' align='center' gutterBottom>
            Knock, Knock Tomatoes
          </Typography>
          <Typography
            variant='subtitle1'
            align='center'
            color='text.secondary'
            component='p'
          >
            Who's There? Farm Freshness!
          </Typography>
          <Copyright />
        </Box>
        {/* End footer */}
        {/* </Grid>
          </Container> */}
        {/* </Paper> */}
      </ThemeProvider>
      {/* </ColorModeContext.Provider> */}
    </>
  );
};

export default App;
