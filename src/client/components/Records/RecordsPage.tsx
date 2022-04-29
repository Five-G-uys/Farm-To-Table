import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductsRecords from './ProductsRecords';

const RecordsPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const [deliveryZones, setDeliveryZones] = useState({ deliveryZonesArray: {} });
  const [dietaryRestrictions, setDietaryRestrictions] = useState({ dietaryRestrictionsArray: {} });
  const [events, setEvents] = useState({ eventsArray: {} });
  const [farms, setFarms] = useState({ farmsArray: {} });
  const [orders, setOrders] = useState({ ordersArray: {} });
  const [products, setProducts] = useState({ productsArray: {} });
  const [roles, setRoles] = useState({ rolesArray: {} });
  const [rsvp, setRSVP] = useState({ rsvpArray: {} });
  const [subscriptionEntries, setSubscriptionEntries] = useState({ subscriptionEntriesArray: {} });
  const [subscriptions, setSubscriptions] = useState({ subscriptionsArray: {} });
  const [users, setUsers] = useState({ usersArray: {} });
  const [vendors, setVendors] = useState({ vendorsArray: {} });

  const handleGetProducts = () => {
    axios.get("/records/Products")
      .then((data) => {
        setProducts((state) => {
          return {
            ...state,
            ProductsArray: [...data.data],
          }
        })
      })
      .catch((error) => {
        console.log("failed request", error);
      })
  }
  console.log(products);
  return (
    <div>
      <button>get deliveryZones</button>
      <button>get dietaryRestrictions</button>
      <button>get events</button>
      <button>get farms</button>
      <button>get orders</button>
      <button onClick={handleGetProducts}>get products</button>
      <div>
        {Array.isArray(products.productsArray) &&
          products.productsArray.map(
            (product: {
              name: string;
              description: string;
              img_url: string;
              available: boolean;
              id: number;
              vendor_id: number;
              quantity: string;
            }) => {
              const { name, description, img_url, available, id, vendor_id, quantity } = product
              return (
                <ProductsRecords
                  name={name}
                  description={description}
                  img_url={img_url}
                  available={available}
                  id={id}
                  vendor_id={vendor_id}
                  quantity={quantity}
                />
              );
            }
          )}
      </div>
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