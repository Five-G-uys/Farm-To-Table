import React from "react";
//import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import ReactDOMClient from "react-dom/client";

<<<<<<< HEAD
import App from "./components/App";
import HomePage from "./components/HomePage";
import SubscriptionsPage from "./components/SubscriptionsPage";
import OrdersPage from "./components/OrdersPage";
import EventsPage from "./components/EventsPage";
import ProfilePage from "./components/ProfilePage";
import EventCard from "./components/EventCard";
=======
import App from './components/App';
import HomePage from './components/HomePage';
import SubscriptionsPage from './components/SubscriptionsPage'
import OrdersPage from './components/OrdersPage';
import EventsPage from './components/EventsPage';
import ProfilePage from './components/ProfilePage';
import Login from './components/Login';

>>>>>>> 509dc8d047ad042503cd3a2082bfe459abe1c7ba

const element = (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="home-page" element={<HomePage />} />
      <Route path="subscriptions-page" element={<SubscriptionsPage />} />
      <Route path="orders-page" element={<OrdersPage />} />
      <Route path="events-page" element={<EventsPage />} />
      <Route path="profile-page" element={<ProfilePage />} />
<<<<<<< HEAD
      <Route path="event-card" element={<EventCard />} />
=======
      <Route path='login' element={<Login />} />
>>>>>>> 509dc8d047ad042503cd3a2082bfe459abe1c7ba
    </Routes>
  </BrowserRouter>
);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const id: any = document.getElementById("app");
const root = ReactDOMClient.createRoot(id);
root.render(element);
