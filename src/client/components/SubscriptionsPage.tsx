/* eslint-disable @typescript-eslint/no-var-requires */

import React, { useState } from 'react';
import axios from 'axios';

const SubscriptionsPage = () => {
  const [checkedOne, setCheckedOne] = useState(false);

  const handleChangeOne = () => {
    console.log('Line 11 SubPage', checkedOne);
    setCheckedOne(!checkedOne);
    console.log('Line 13 SubPage', checkedOne);
  };

  const user = {
    id: 2,
    name: 'Guido Fruchter',
    address: '230 Del Mar Point',
    subscribed: false,
    delivery_zone: 'Rovira',
  };

  const handleSubscribed = () => {
    axios
      .put(`/subscribed/${user.name}`, { subscribed: checkedOne })
      .then((response) => {
        console.log('Line 16 SubscriptionsPage', response);
      })
      .catch((err) => {
        console.log('Line 19 SubscriptionsPage', err);
      });
  };

  return (
    <div>
      <input
        type='checkbox'
        text='Subscribed'
        value={checkedOne}
        onChange={() => setCheckedOne(!checkedOne)}
      />
      <button onClick={handleSubscribed}>Submit</button>
    </div>
  );
};

export default SubscriptionsPage;
