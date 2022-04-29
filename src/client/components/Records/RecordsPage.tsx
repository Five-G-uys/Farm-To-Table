import React, { useState, useEffect } from "react";
import axios from "axios";
import {Routes, Route, Link, Navigate} from 'react-router-dom' 
import ProductsRecords from './Products/ProductsRecords';
import DietaryRestrictionsRecords from "./DietaryRestrictions/DietaryRestrictionsRecords";
import DeliveryZones from "./DileveryZones/DeliveryZonesRecords";
import Events from "./Events/EventsRecords";
import Farms from "./Farms/FarmsRecords";
import Orders from "./Orders/OrdersRecords";
import Products from "./Products/ProductsRecords";
import Roles from "./Roles/RolesRecords";
import SubscriptionEntries from "./SubscriptionEntries/SubscriitionEntriesRecords";
import Subscriptions from "./Subscriptions/SubscriptionsRecords";
import Users from "./Users/UsersRecords";
import Vendors from "./Vendors/VendorsRecords";

const RecordsPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  // const [deliveryZones, setDeliveryZones] = useState({ deliveryZonesArray: {} });
  // const [dietaryRestrictions, setDietaryRestrictions] = useState({ dietaryRestrictionsArray: {} });
  // const [events, setEvents] = useState({ eventsArray: {} });
  // const [farms, setFarms] = useState({ farmsArray: {} });
  // const [orders, setOrders] = useState({ ordersArray: {} });
  // const [products, setProducts] = useState({ productsArray: {} });
  // const [roles, setRoles] = useState({ rolesArray: {} });
  // const [rsvp, setRSVP] = useState({ rsvpArray: {} });
  // const [subscriptionEntries, setSubscriptionEntries] = useState({ subscriptionEntriesArray: {} });
  // const [subscriptions, setSubscriptions] = useState({ subscriptionsArray: {} });
  // const [users, setUsers] = useState({ usersArray: {} });
  // const [vendors, setVendors] = useState({ vendorsArray: {} });

  return (
    <div>
      <Routes>
        <Route path="products" element={<ProductsRecords/>} />
      </Routes>
      <button>get deliveryZones</button>
      <button>get dietaryRestrictions</button>
      <button>get events</button>
      <button>get farms</button>
      <button>get orders</button>
      <button>get products</button>  
      <button>get roles</button>
      <button>get rsvp</button>
      <button>get subscriptionEntries</button>
      <button>get subscriptions</button>
      <button>get users</button>
      <button>get vendors</button>
    </div>
  )

}

export default RecordsPage;