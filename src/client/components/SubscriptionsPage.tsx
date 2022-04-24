/* eslint-disable @typescript-eslint/no-var-requires */

import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { number } from 'prop-types';
// import { useHistory } from 'react-router-dom';

const SubscriptionsPage = () => {
  const [checkedOne, setCheckedOne] = useState(false);
  // const [firstName, setFirstName] = useState();
  // const history = useHistory();
  const [id, setId] = useState(0);

  // const [subscription, setSubscription] = useState({
  //   season: '',
  //   price: 0,
  //   payment_option: '',
  //   description: '',
  // });

  // const handleChangeOne = () => {
  //   console.log('Line 11 SubPage', checkedOne);
  //   setCheckedOne(!checkedOne);
  //   console.log('Line 13 SubPage', checkedOne);
  // };

  // const user = {
  //   id: 2,
  //   name: 'Guido Fruchter',
  //   address: '230 Del Mar Point',
  //   subscribed: false,
  //   delivery_zone: 'Rovira',
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
      {/* <input
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder='First name'
        type='text'
        name='firstName'
        required
      /> */}
      <button onClick={handleSubscribed}>Subscribe</button>
    </div>
  );
};

export default SubscriptionsPage;
