/* eslint-disable @typescript-eslint/no-var-requires */

import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { number } from 'prop-types';

const SubscriptionsPage = () => {
  const [checkedOne, setCheckedOne] = useState(false);
  const [id, setId] = useState(0);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();

  // const handleChangeOne = () => {
  //   console.log('Line 11 SubPage', checkedOne);
  //   setCheckedOne(!checkedOne);
  //   console.log('Line 13 SubPage', checkedOne);
  // };

  useEffect((): void => {
    // TAKE THIS AXIOS CALL TO GET USER
    axios
      .get<AxiosResponse>('/api/userProfile')
      .then(({ data }: AxiosResponse) => {
        const { id }: { id: number } = data;
        setId(id);
      })
      .catch((err) => console.warn(err));
  }, []);

  const handleSubscribed = () => {
    axios
      .put(`/subscribed/${id}`, { subscribed: checkedOne })
      .then((response) => {
        console.log('SubscriptionsPage.tsx response', response);
      })
      .catch((err) => {
        console.log('SubscriptionsPage.tsx error', err);
      });
  };

  return (
    <div>
      <div>Give us some more information about yourself!</div>
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
      </div>
      <div>
        Now choose a seasonal package and subscribe for 12 weeks of home
        deliveries. Or select the whole year!
      </div>
      <br />
      {/* <input type='checkbox' onChange={() => setCheckedOne(!checkedOne)} />
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
      <br /> */}
      <button onClick={handleSubscribed}>Subscribe</button>
    </div>
  );
};

export default SubscriptionsPage;
