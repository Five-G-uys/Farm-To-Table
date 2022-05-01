/* eslint-disable @typescript-eslint/no-var-requires */

import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import SubscriptionCard from './SubscriptionCard';

const SubscriptionsPage = () => {
  const navigate = useNavigate();
  const [id, setId] = useState(0);
  const [season, setSeason] = useState('');

  // change checkboxes to radio buttons

  const [subscription, setSubscription] = useState({
    season: '',
    year: 0,
    flat_price: 0,
    description: '',
    subArray: [],
  });

  useEffect((): void => {
    // TAKE THIS AXIOS CALL TO GET USER
    axios
      .get<AxiosResponse>('auth/api/userProfile')
      .then(({ data }: AxiosResponse) => {
        const { id }: { id: number } = data;
        setId(id);
      })
      .catch((err) => console.warn(err));
    axios
      .get(`/api/subscriptions/`)
      .then((response) => {
        setSubscription((state) => {
          return { ...state, subArray: response.data };
        });
        // console.log('LINE 46 SubscriptionPage.tsx', response);
      })
      .catch((err) => {
        console.error('Line 49 subPage.tsx', err);
      });
  }, []);

  // console.log('LINE 45', subscription.subArray);
  const handleCheckout = () => {
    console.log('CHeckout');
    fetch("/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Send along all the information about the items
      body: JSON.stringify({
        items: [
          {
            id: 1,
            quantity: 2,
          },
          {
            id: 2,
            quantity: 1,
          },
        ],
      }),
    })
      .then(res => {
        if (res.ok) return res.json()
        // If there is an error then make sure we catch that
        return res.json().then(e => Promise.reject(e))
      })
      .then(({ url }) => {
        // On success redirect the customer to the returned URL
        console.log(url);
        // window.location = url
      })
      .catch(e => {
        console.error(e.error)
      })
  };

  const handleSubscribed = () => {
    // Insert Stripe Functionality Here
    if (season) {
      axios
        .post(`/api/add_subscription_entry/${id}`, {
          farm_id: 1,
          season: season, // change season to number season id on server side
        })
        .then((response) => {
          // console.log('LINE 56 || SUBSCRIPTIONSPAGE.TSX ||', response);
          //NAVIGATE REDIRECTS TO CONFIRMATION PAGE SO NO NEED FOR LINK TAG IN JSX
          navigate('/subscriptions-page/confirmation-page');
        })
        .catch((err) => {
          console.error('LINE 59 || SUBSCRIPTIONSPAGE ERROR', err);
        });
    } else {
      alert('You must select one');
    }
  };

  const { subArray } = subscription;

  return (
    <div>
      <div>
        {subArray.map(
          (sub: {
            id: number;
            season: string;
            year: number;
            flat_price: number;
            weekly_price: number;
            description: string;
            start_date: string;
            end_date: string;
            farm_id: 1;
          }) => {
            return (
              <SubscriptionCard
                season={sub.season}
                year={sub.year}
                flat_price={sub.flat_price}
                weekly_price={sub.weekly_price}
                description={sub.description}
                start_date={sub.start_date}
                end_date={sub.end_date}
                key={sub.id}
              />
            );
          }
        )}
        Choose a seasonal package for 12 weeks of home deliveries. Or select the
        whole year!
      </div>
      <br />
      <input
        name='season'
        value='spring'
        type='radio'
        className='form-event'
        onChange={(e) => setSeason(e.target.value)}
      />
      <label htmlFor='season'> Spring 2022 </label>
      <br />
      <input
        name='season'
        value='fall'
        type='radio'
        className='form-event'
        onChange={(e) => setSeason(e.target.value)}
      />
      <label htmlFor='season'> Fall 2022 </label>
      <br />
      <input
        name='season'
        value='winter'
        type='radio'
        className='form-event'
        onChange={(e) => setSeason(e.target.value)}
      />
      <label htmlFor='season'> Winter 2022 </label>
      <br />
      <button className='form--submit' onClick={handleCheckout}>
        {/* <Link to={`/confirmation-page`}>Subscribe!</Link> */}Checkout!
      </button>
      <button className='form--submit' onClick={handleSubscribed}>
        {/* <Link to={`/confirmation-page`}>Subscribe!</Link> */}Subscribe!
      </button>
    </div>
    // </div>
  );
};

export default SubscriptionsPage;
