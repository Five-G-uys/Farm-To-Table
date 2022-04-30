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
import DeliveryRoutesPage from './DeliveryRoutesPage';
import PackingListPage from './PackingListPage';
// import UserRecordsPage from './UserRecordsPagge'


export const UserContext: any = createContext(null)

const App = () => {
  const [user, setUser] = useState({});


  useEffect((): void => {
    // TAKE THIS AXIOS CALL TO GET USER
    axios
      .get<AxiosResponse>('/auth/api/userProfile')
      .then(({ data }: AxiosResponse) => {
        console.log('LINE 30 || APP COMPONENT', data);
        setUser(data);
      })
      .catch((err) => console.warn(err)); //
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
            <Route path='/delivery-routes' element={<DeliveryRoutesPage />} />
            <Route path='/packing-lists' element={<PackingListPage />} />

            {/* Admin Routes */}
            <Route
              path='/events-page'
              element={
                isAdmin(user) ? <EventsPage /> : <Navigate to='/event-card' />
              }
            />
            {/* <Route 
              path='/user-records',
              element={isAdmin ? <UserRecordsPage /> : <Navigate to='/profile-page'} /> */}
            <Route
              path='/subscriptions-admin'
              element={<SubscriptionsAdmin />}
            />
            <Route path='/edit-products' element={<ProductsPage />} />
            <Route path='/records' element={<RecordsPage />} />
          </Routes>
        </UserContext.Provider>
      </div>
    </>
  );
};

export default App;
