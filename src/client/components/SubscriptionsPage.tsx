/* eslint-disable @typescript-eslint/no-var-requires */

import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { number } from 'prop-types';
import SubscriptionCard from './SubscriptionCard';
const SubscriptionsPage = () => {
  const [checkedOne, setCheckedOne] = useState(false);
  const [id, setId] = useState(0);
  // const [firstName, setFirstName] = useState();
  // const [lastName, setLastName] = useState();
  // const [address, setAddress] = useState();
  // const [phone, setPhone] = useState();

  const [subscription, setSubscription] = useState({
    season: '',
    year: 0,
    flatPrice: 0,
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
      {/* <div>Give us some more information about yourself!</div>
      <input
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder='First name'
        type='text'
        name='firstName'
        required
      />
      <div>
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder='Last name'
          type='text'
          name='lastName'
          required
        />
      </div>
      <div>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder='Address'
          type='text'
          name='address'
          required
        />
      </div>
      <div>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder='Phone number'
          type='text'
          name='phone'
          required
        />
      </div> */}
      <div>
        {subArray.map(
          (sub: {
            season: string;
            year: number;
            flatPrice: number;
            description: string;
            id: number;
          }) => {
            return (
              <SubscriptionCard
                season={sub.season}
                year={sub.year}
                flatPrice={sub.flatPrice}
                description={sub.description}
                key={sub.id}
              />
            );
          }
        )}
        Now choose a seasonal package and subscribe for 12 weeks of home
        deliveries. Or select the whole year!
      </div>
      <br />
      <input type='checkbox' onChange={() => setCheckedOne(!checkedOne)} />
      <label htmlFor='season'> Spring Season </label>
      <br />
      <input type='checkbox' onChange={() => setCheckedOne(!checkedOne)} />
      <label htmlFor='season'> Autumn Season </label>
      <br />
      <input type='checkbox' onChange={() => setCheckedOne(!checkedOne)} />
      <label htmlFor='season'> Winter Season </label>
      <br />
      <input type='checkbox' onChange={() => setCheckedOne(!checkedOne)} />
      <label htmlFor='season'> Whole Year </label>
      <br />
      <button onClick={handleSubscribed}>Subscribe</button>
    </div>
    // </div>
  );
};

export default SubscriptionsPage;
