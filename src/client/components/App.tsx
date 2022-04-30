/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// React Imports
import React, { useState, useEffect, createContext } from "react";
import axios, { AxiosResponse } from "axios";
import { Routes, Route, Navigate, Link } from "react-router-dom";

// MUI Imports
<<<<<<< HEAD
import HomePage from "./HomePage";
import EventCard from "./EventCard";
import SubscriptionsPage from "./SubscriptionsPage";
import Confirmation from "./Confirmation";
import SubscriptionsAdmin from "./SubscriptionsAdmin";
import OrdersPage from "./OrdersPage";
import EventsPage from "./EventsPage";
import ProfilePage from "./ProfilePage";
import AboutUsPage from "./AboutUsPage";
import Login from "./Login";
import NewNavBar from "./NewNavBar";
import ProductsPage from "./ProductsPage";
import RecordsPage from "./Records/RecordsPage";
=======
import HomePage from './HomePage';
import EventCard from './EventCard';
import SubscriptionsPage from './SubscriptionsPage';
import Confirmation from './Confirmation';
import SubscriptionsAdmin from './SubscriptionsAdmin';
import OrdersPage from './OrdersPage';
import EventsPage from './EventsPage';
import ProfilePage from './ProfilePage';
import AboutUsPage from './AboutUsPage';
import Login from './Login';
import NewNavBar from './NewNavBar';
import ProductsPage from './ProductsPage';
import RecordsPage from './Records/RecordsPage';
import DeliveryRoutesPage from './DeliveryRoutesPage';
import PackingListPage from './PackingListPage';
import UserRecordsPage from './UsersRecordsPage'

>>>>>>> 7367daa68bb515f51f6e47e5ad1745e9db0e2600

//////////*******************DARK MODE ****************///////////////////////////

// Import MUI stuff
import "@fontsource/roboto"; // Loading Roboto font. MUI was designed with this font in mind.
import {
  Card,
  CardHeader,
  Switch,
  CardContent,
  Box,
  Container,
  Typography,
  FormGroup,
  FormControlLabel,
  CssBaseline,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

interface AppProps {
  light: any;
  dark: any;
}
// Define theme settings
const light = {
  palette: {
    mode: "light",
  },
};

const dark = {
  palette: {
    mode: "dark",
  },
};

export const UserContext: any = createContext(null);

const App = () => {
  const [user, setUser] = useState({});

  useEffect((): void => {
    // TAKE THIS AXIOS CALL TO GET USER
    axios
<<<<<<< HEAD
      .get<AxiosResponse>("/auth/api/userProfile")
=======
      .get('/auth/api/userProfile')
>>>>>>> 7367daa68bb515f51f6e47e5ad1745e9db0e2600
      .then(({ data }: AxiosResponse) => {
        console.log("LINE 30 || APP COMPONENT", data);
        setUser(data);
      })
      .catch((err) => console.warn(err)); //
  }, []);

  ////********************DARK MODE HERE *********************////
  // The light theme is used by default
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // This function is triggered when the Switch component is toggled
  const changeTheme = ({ dark, light }: AppProps) => {
    setIsDarkTheme(!isDarkTheme);
  };

  const isLoggedIn = (user: any) => user.role_id > 0;
  const isEmployee = (user: any) => user.role_id > 2;
  const isAdmin = (user: any) => user.role_id > 3;

  return (
    <>
      <ThemeProvider
        theme={isDarkTheme ? createTheme(dark) : createTheme(light)}
      >
        <CssBaseline />
        <Container>
          <div className="App">
            <Box component="div" p={5}></Box>
            <Card>
              <CardHeader
                action={
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch checked={isDarkTheme} onChange={changeTheme} />
                      }
                      label="Dark Theme"
                    />
                  </FormGroup>
                }
              />
              <CardContent>
                <Typography variant="h3" component="h3"></Typography>
                <Typography variant="body1">
                  Dark Mode is {isDarkTheme ? "On" : "Off"}
                </Typography>
              </CardContent>
            </Card>
          </div>
        </Container>
      </ThemeProvider>

      <NewNavBar user={user} />
      <div>
        <h1>{user.role_id}</h1>
        <UserContext.Provider value={user}>
          <Routes>
<<<<<<< HEAD
            <Route path="/" element={<HomePage />} />
            {/* Login/Logout Routes */}
            <Route
              path="/login"
              element={
                isLoggedIn(user) ? <Navigate to="/profile-page" /> : <Login />
              }
            />

            {/* General Routes */}
            <Route path="/about-us-page" element={<AboutUsPage />} />
            <Route path="/subscriptions-page" element={<SubscriptionsPage />} />
            <Route path="/event-card" element={<EventCard />} />

            {/* User Routes */}
            <Route path="/profile-page" element={<ProfilePage />} />
            <Route
              path="/subscriptions-page/confirmation-page"
              element={<Confirmation />}
            />
            <Route
              path="/orders-page"
              element={
                isLoggedIn(user) ? <OrdersPage /> : <Navigate to="/login" />
              }
            />

            {/* Employ Routes */}

            {/* Admin Routes */}
            <Route
              path="/events-page"
              element={
                isAdmin(user) ? <EventsPage /> : <Navigate to="/event-card" />
              }
            />
            <Route
              path="/subscriptions-admin"
              element={<SubscriptionsAdmin />}
            />
            <Route path="/edit-products" element={<ProductsPage />} />
            <Route path="/records" element={<RecordsPage />} />
=======
            {/* Login/Logout Routes */}
            <Route
              path='/login'
              element={isLoggedIn(user) ? <Navigate to='/profile-page' /> : <Login />} />

            {/* General Routes */}
            <Route 
              path='/' 
              element={<HomePage />} />
            <Route 
              path='/about-us-page' 
              element={<AboutUsPage />} />
            <Route 
              path='/subscriptions-page' 
              element={<SubscriptionsPage />} />
            <Route 
              path='/event-card' 
              element={<EventCard />} />
            <Route 
              path='/edit-products' 
              element={<ProductsPage />} />
            {/* Restricted User Routes */}
            <Route 
              path='/profile-page' 
              element={isLoggedIn(user) ? <ProfilePage /> : <Navigate to='/login' />} />
            <Route
              path='/subscriptions-page/confirmation-page'
              element={isLoggedIn(user) ? <Confirmation /> : <Navigate to='/login' />} />
            <Route
              path='/orders-page'
              element={isLoggedIn(user) ? <OrdersPage /> : <Navigate to='/login' />}/>
            {/* Restricted Employ Routes */}
            <Route 
              path='/delivery-routes' 
              element={isEmployee(user) ? <DeliveryRoutesPage /> : <Navigate to='/login' />}/>
            <Route 
              path='/packing-lists'
              element={isEmployee(user) ? <PackingListPage /> : <Navigate to='/login' />} />
            {/* Restricted Admin Routes */}
            <Route
              path='/events-page'
              element={isAdmin(user) ? <EventsPage /> : <Navigate to='/event-card' />} />
            <Route 
              path='/edit-users'
              element={isAdmin(user) ? <UserRecordsPage /> : <Navigate to='/profile-page' />} />
            <Route
              path='/subscriptions-admin'
              element={isAdmin(user) ? <SubscriptionsAdmin /> : <Navigate to='/subscriptions-page' />} />
            <Route 
              path='/records' 
              element={isAdmin(user) ? <RecordsPage /> : <Navigate to='/profile-page' />} />
>>>>>>> 7367daa68bb515f51f6e47e5ad1745e9db0e2600
          </Routes>
        </UserContext.Provider>
      </div>
    </>
  );
};

export default App;
