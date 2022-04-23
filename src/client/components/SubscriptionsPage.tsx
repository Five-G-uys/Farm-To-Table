/* eslint-disable @typescript-eslint/no-var-requires */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Checkbox from './Checkbox';

const SubscriptionsPage = () => {
  const [checkedOne, setCheckedOne] = useState(false);

  const handleChangeOne = () => {
    setCheckedOne(!checkedOne);
  };

  return (
    <div>
      <Checkbox
        text='Subscribed'
        value={checkedOne}
        onChange={handleChangeOne}
      />
      <button>Submit</button>
    </div>
  );
};

export default SubscriptionsPage;
