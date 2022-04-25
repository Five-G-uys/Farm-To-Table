/* eslint-disable @typescript-eslint/no-var-requires */

import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
// import { Link } from 'react-router-dom';
import SubscriptionCard from './SubscriptionCard';
const SubscriptionsPage = () => {
  const [checkedOne, setCheckedOne] = useState(false);
  const [id, setId] = useState(0);

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
      .get<AxiosResponse>('/api/userProfile')
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
        console.log('LINE 46 SubscriptionPage.tsx', response);
      })
      .catch((err) => {
        console.error('Line 49 subPage.tsx', err);
      });
  }, []);

  console.log('LINE 45', subscription.subArray);

  const handleSubscribed = () => {
    axios
      .put(`/api/subscribed/${id}`, { subscribed: checkedOne })
      .then((response) => {
        console.log('LINE 36', response);
      })
      .catch((err) => {
        console.log('SubscriptionsPage.tsx error', err);
      });
  };

  const { subArray } = subscription;

  return (
    <div>
      <div>
        {subArray.map(
          (sub: {
            season: string;
            year: number;
            flat_price: number;
            description: string;
            id: number;
          }) => {
            return (
              <SubscriptionCard
                season={sub.season}
                year={sub.year}
                flat_price={sub.flat_price}
                description={sub.description}
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
        type='checkbox'
        className='form-event'
        onChange={() => setCheckedOne(!checkedOne)}
      />
      <label htmlFor='season'> Spring 2022 </label>
      <br />
      <input
        type='checkbox'
        className='form-event'
        onChange={() => setCheckedOne(!checkedOne)}
      />
      <label htmlFor='season'> Fall 2022 </label>
      <br />
      <input
        type='checkbox'
        className='form-event'
        onChange={() => setCheckedOne(!checkedOne)}
      />
      <label htmlFor='season'> Whole Year </label>
      <br />
      <button className='form--submit' onClick={handleSubscribed}>
        Subscribe
      </button>
    </div>
    // </div>
  );
};

export default SubscriptionsPage;
