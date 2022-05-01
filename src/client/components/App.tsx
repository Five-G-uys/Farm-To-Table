/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// React Imports
import React, { useState, useEffect, createContext } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Routes, Route, Navigate, Link } from 'react-router-dom';

// MUI Imports
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
import DileveryZonesRecords from '../components/Records/Products/ProductsRecords'
import EventsRecords from '../components/Records/Products/ProductsRecords'
import FarmsRecords from '../components/Records/Products/ProductsRecords'
import OrdersRecords from '../components/Records/Orders/OrdersRecords'
import ProductsRecords from '../components/Records/Products/ProductsRecords'
import SubscriptionEntries from '../components/Records/Products/ProductsRecords'
import SubscriptionsRecords from '../components/Records/Products/ProductsRecords'
import UsersRecords from '../components/Records/Products/ProductsRecords'
import VendorsRecords from '../components/Records/Products/ProductsRecords'

export const UserContext: any = createContext(null)

const App = () => {
  const [user, setUser] = useState({});


  useEffect((): void => {
    // TAKE THIS AXIOS CALL TO GET USER
    axios
      .get<AxiosResponse>('/auth/api/userProfile')
      .then(({ data }: AxiosResponse) => {
        // console.log('LINE 30 || APP COMPONENT', data);
        setUser(data);
      })
      .catch((err) => console.warn(err));
  }, []);

  const isLoggedIn = (user: any) => user.role_id > 0;
  const isSubscriber = (user: any) => user.role_id > 1;
  const isEmployee = (user: any) => user.role_id > 2;
  const isAdmin = (user: any) => user.role_id > 3;

  return (
    <>
      <NewNavBar user={user} />
      <div>
        <h1>{user.role_id}</h1>
        <UserContext.Provider value={user}>
          <Routes>
            <Route path='/' element={<HomePage />} />
            {/* Login/Logout Routes */}
            <Route
              path='/login'
              element={
                isLoggedIn(user) ? <Navigate to='/profile-page' /> : <Login />
              }
            />
            {/* General Routes */}
            <Route path='/about-us-page' element={<AboutUsPage />} />
            <Route path='/subscriptions-page' element={<SubscriptionsPage />} />
            <Route path='/event-card' element={<EventCard />} />
            {/* User Routes */}
            <Route path='/profile-page' element={<ProfilePage />} />
            <Route
              path='/subscriptions-page/confirmation-page'
              element={<Confirmation />}
            />
            <Route
              path='/orders-page'
              element={
                isLoggedIn(user) ? <OrdersPage /> : <Navigate to='/login' />
              }
            />
            {/* Employ Routes */}
            {/* Admin Routes */}
            <Route
              path='/events-page'
              element={
                isAdmin(user) ? <EventsPage /> : <Navigate to='/event-card' />
              }
            />
            <Route
              path='/subscriptions-admin'
              element={<SubscriptionsAdmin />}
            />
            <Route path='/edit-products' element={<ProductsPage />} />

            <Route path='records' element={<RecordsPage />} >
              <Route path='products-records' element={<ProductsRecords />} />
            </Route>

            <Route path='dileveryZones-records' element={<ProductsRecords />} />
            <Route path='events-records' element={<ProductsRecords />} />
            <Route path='farms-records' element={<ProductsRecords />} />
            <Route path='orders-records' element={<OrdersRecords />} />
            <Route path='products-records' element={<ProductsRecords />} />
            <Route path='subscriptionEntries-records' element={<ProductsRecords />} />
            <Route path='subscriptions-records' element={<ProductsRecords />} />
            <Route path='users-records' element={<ProductsRecords />} />
            <Route path='vendors-records' element={<ProductsRecords />} />
            
          </Routes>
        </UserContext.Provider>
      </div>
    </>
  );
};

export default App;
