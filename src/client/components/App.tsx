/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// React Imports
import React, { useState, useEffect, useMemo } from 'react';
import axios, { AxiosResponse } from 'axios';
import { UserContext } from './UserContext';
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
import ProductsRecords from '../components/Records/Products/ProductsRecords'

const App = () => {
  const [user, setUser] = useState('User context value');
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

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
        <UserContext.Provider value={value}>

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
              <Route path='records' element={<RecordsPage />}/>
              <Route path='products-records' element={<ProductsPage/>}/>
              
            </Routes>
        </UserContext.Provider>
      </div>
    </>
  );
};

export default App;
