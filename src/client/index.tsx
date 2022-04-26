import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOMClient from 'react-dom/client';
import App from './components/App';

<<<<<<< HEAD
import EventCard from "./components/EventCard";
import App from "./components/App";
import HomePage from "./components/HomePage";
import SubscriptionsPage from "./components/SubscriptionsPage";
import Confirmation from "./components/Confirmation";
import OrdersPage from "./components/OrdersPage";
import EventsPage from "./components/EventsPage";
import ProfilePage from "./components/ProfilePage";
import Login from "./components/Login";
import NewNavBar from "./components/NewNavBar";
import "./styles.css";
//mport EventCalander from "./components/EventCalander";

const element = (
  <BrowserRouter>
    <NewNavBar />
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
      {/* <Route path="event-calander" element={<EventCalander />} /> */}
      <Route path="login" element={<Login />} />
    </Routes>
=======
import './styles.css';

const element = (
  <BrowserRouter>
    <App />
>>>>>>> 9a77f5efae794f49c9c221fa283e8f505b58db9f
  </BrowserRouter>
);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const id: any = document.getElementById('app');
const root = ReactDOMClient.createRoot(id);
root.render(element);
