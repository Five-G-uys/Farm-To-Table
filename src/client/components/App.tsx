/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// React Imports
import React, { useState, useEffect, createContext } from "react";
import axios, { AxiosResponse } from "axios";
import { Routes, Route, Navigate, Link } from "react-router-dom";

// MUI Imports
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
import RSVPS from "../components/RSVPS";

export const UserContext: any = createContext(null);

const App = () => {
  const [user, setUser] = useState({});

  useEffect((): void => {
    // TAKE THIS AXIOS CALL TO GET USER
    axios
      .get<AxiosResponse>("/auth/api/userProfile")
      .then(({ data }: AxiosResponse) => {
        console.log("LINE 30 || APP COMPONENT", data);
        setUser(data);
      })
      .catch((err) => console.warn(err));
  }, []);

  const [rsvpEvents, setRsvpEvents] = useState({
    eventsToAttend: [],
    rsvpsTotal: 0,
    user_rsvps: 0,
  });
  console.log("44, What's user", user);
  const getAllRSVPSEvents = () => {
    if (user.role_id < 4) {
      axios
        .get(`/events/api/user/rsvps/${user.id}`)
        .then((data) => {
          console.log("LINE 33 FrontEND request", data.data);
          const newArr = data.data
            .map((eventObj: any) => {
              return eventObj.value;
            })
            .map((eventArr: any) => {
              return eventArr[0];
            });
          setRsvpEvents((state: any) => {
            return { ...state, eventsToAttend: newArr };
          });
        })
        .catch((err) => {
          console.log("LINE 48 FAILED", err);
        });
    }

    if (user.role_id === 4) {
      axios
        .get("/events/api/rsvps")
        .then((data) => {
          console.log("LINE 55 FrontEND request", data.data);
          const newArr = data.data;

          setRsvpEvents((state: any) => {
            return { ...state, rsvpsTotal: newArr.length };
          });
        })
        .catch((err) => {
          console.log("LINE 15 FAILED", err);
        });
    }
  };
  console.log(
    "LINE 75 ",
    rsvpEvents.eventsToAttend + "and" + rsvpEvents.rsvpsTotal + "number"
  );

  const { rsvpsTotal, eventsToAttend } = rsvpEvents;

  useEffect(() => {
    getAllRSVPSEvents();
  }, []);
  console.log("LINE 45", rsvpEvents.eventsToAttend);

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
            <Route
              path="/profile-page"
              element={<ProfilePage getAllRSVPSEvents={getAllRSVPSEvents} />}
            />
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
          </Routes>
        </UserContext.Provider>
      </div>
    </>
  );
};

export default App;
