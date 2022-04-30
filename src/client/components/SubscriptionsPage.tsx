/* eslint-disable @typescript-eslint/no-var-requires */

import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import SubscriptionsContainer from './SubscriptionsContainer';
// import { UserContext } from './App';

const SubscriptionsPage = () => {
  // const user: any = useContext(UserContext);
  // console.log('THIS IS WORKING', user);
  const navigate = useNavigate();

  const [id, setId] = useState(0);

  const [season, setSeason] = useState('');

  const [subscriptions, setSubscriptions] = useState([]);

  const [subscription, setSubscription] = useState({
    id: 0,
    season: '',
    year: 0,
    flat_price: 0,
    weekly_price: 0,
    description: '',
    start_date: '',
    end_date: '',
  });

  // useEffect((): void => {
  //   // TAKE THIS AXIOS CALL TO GET USER
  //   axios
  //     .get<AxiosResponse>('/api/userProfile')
  //     .then(({ data }: AxiosResponse) => {
  //       const { id }: { id: number } = data;
  //       setId(id);
  //     })
  //     .catch((err) => console.warn(err));
  //   axios
  //     .get(`/api/subscriptions/`)
  //     .then((response) => {
  //       setSubscription((state) => {
  //         return { ...state, subArray: response.data };
  //       });
  //       // console.log('LINE 46 SubscriptionPage.tsx', response);
  //     })
  //     .catch((err) => {
  //       console.error('Line 49 subPage.tsx', err);
  //     });
  // }, []);

  const getAllSubscriptions = () => {
    axios
      .get(`/api/subscriptions/`)
      .then((data) => {
        console.log(data.data);
        setSubscriptions(data.data);
      })
      .catch((err) => {
        console.error('Line 59 subPage.tsx', err);
      });
  };

  useEffect((): void => {
    getAllSubscriptions();
  }, []);

  const handleCheckout = () => {
    console.log('Checkout');
    fetch('/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
      .then((res) => {
        if (res.ok) return res.json();
        // If there is an error then make sure we catch that
        return res.json().then((e) => Promise.reject(e));
      })
      .then(({ url }) => {
        // On success redirect the customer to the returned URL
        window.location = url;
      })
      .catch((e) => {
        console.error(e.error);
      });
  };

  //SUBSCRIPTION CREATE
  const handleSubscribed = () => {
    // Insert Stripe Functionality Here
    if (season) {
      axios
        .post(`/api/add_subscription_entry/${id}`, {
          farm_id: 1,
          season: season, // change season to number season id on server side
        })
        .then(() => {
          navigate('/subscriptions-page/confirmation-page');
        })
        .catch((err) => {
          console.error('LINE 59 || SUBSCRIPTIONSPAGE ERROR', err);
        });
    } else {
      alert('You must select one');
    }
  };

  return (
    <div>
      <SubscriptionsContainer
        subscriptions={subscriptions}
        getAllSubscriptions={getAllSubscriptions}
      />
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
        Subscribe!
      </button>
    </div>
  );
};

export default SubscriptionsPage;
