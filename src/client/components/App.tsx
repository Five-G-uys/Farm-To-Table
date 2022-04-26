/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Route, Routes, useRoutes } from 'react-router-dom';
import axios from 'axios';
import HomePage from './HomePage';
import Confirmation from './Confirmation';
import EventCard from './EventCard';
import EventsPage from './EventsPage';
import Login from './Login';
import NewNavBar from './NewNavBar';
import OrdersPage from './OrdersPage';
import ProfilePage from './ProfilePage';
import SubscriptionsPage from './SubscriptionsPage';
import { UserContext } from './UserContext';







const App= () => {

  

  return (
    <div>
      <NewNavBar />
      <UserContext.Provider value="hello from context">
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="home-page" element={<HomePage />} />
          <Route path="subscriptions-page" element={<SubscriptionsPage />}>
            <Route path="confirmation-page" element={<Confirmation />} />
          </Route>
          <Route path="orders-page" element={<OrdersPage />} />
          <Route path="events-page" element={<EventsPage />} />
          <Route path="profile-page" element={<ProfilePage />} />
          <Route path="event-card" element={<EventCard />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </UserContext.Provider>
    </div>
  )
};

export default App;
