/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useRoutes } from 'react-router-dom';
import axios from 'axios';
import HomePage from './HomePage';
import NavBar from './Navbar'
// import AboutUsPage from './AboutUsPage';
// import EventsPage from './EventsPage';
// import ProfilePage from './ProfilePage';
// import SubscriptionsPage from './SubscriptionsPage';

const App= () => {

  

  return (
    <div>
      
      <HomePage />
      <NavBar/>
    </div>
  )
};

export default App;
