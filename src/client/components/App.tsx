/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useMemo } from 'react';
import axios, { AxiosResponse } from 'axios';
import HomePage from './HomePage';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import EventCard from './EventCard';
import SubscriptionsPage from './SubscriptionsPage';
import Confirmation from './Confirmation';
import OrdersPage from './OrdersPage';
import EventsPage from './EventsPage';
import ProfilePage from './ProfilePage';
import Login from './Login';
import NewNavBar from './NewNavBar';
import { UserContext } from './UserContext'

const App = () => {
  const [user, setUser] = useState('User context value')
  const value = useMemo(() => ({user, setUser}), [user, setUser])

  useEffect((): void => {
    // TAKE THIS AXIOS CALL TO GET USER
    axios
      .get<AxiosResponse>("/api/userProfile")
      .then(({ data }: AxiosResponse) => {
        // console.log(data);
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
      <NewNavBar />
      <div>
        <UserContext.Provider value={value} >

          {/* <h1>User Logged In: {`${loggedIn(user)}`} </h1> */}
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route 
              path='subscriptions-page' 
              element={<SubscriptionsPage />} ></Route>
            <Route
              path='subscriptions-page/confirmation-page'
              element={<Confirmation />} />
            <Route 
              path='orders-page' 
              element={isLoggedIn(user) ? <OrdersPage /> : <Navigate to='login' />} />
            <Route 
              path='events-page' 
              element={<EventsPage />} />
            <Route 
              path='event-card' 
              element={<EventCard />} />
            <Route 
              path='login/profile-page' 
              element={<ProfilePage />} />
            <Route 
              path='login' 
              element={isLoggedIn(user) ? <Navigate to='profile-page' /> : <Login />} />
          </Routes>
        </UserContext.Provider>
      </div>
    </>
  );
};

export default App;
