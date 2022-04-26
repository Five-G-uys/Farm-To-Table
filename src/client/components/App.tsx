/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useMemo } from 'react';
import axios from 'axios';
import HomePage from './HomePage';
import { Routes, Route, Link } from 'react-router-dom';
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


  return (
    <>
      <NewNavBar />
      <div>
        <UserContext.Provider value={value} >
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='subscriptions-page' element={<SubscriptionsPage />} />
            <Route
              path='subscriptions-page/confirmation-page'
              element={<Confirmation />}
            />
            <Route path='orders-page' element={<OrdersPage />} />
            <Route path='events-page' element={<EventsPage />} />
            <Route path='profile-page' element={<ProfilePage />} />
            <Route path='event-card' element={<EventCard />} />
            <Route path='login' element={<Login />} />
          </Routes>
        </UserContext.Provider>
      </div>
    </>
  );
};

export default App;
