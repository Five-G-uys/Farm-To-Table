/* eslint-disable @typescript-eslint/no-var-requires */

import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import SubscriptionCard from './SubscriptionCard';

const SubscriptionsPage = () => {
  const navigate = useNavigate();
  const [checkedOne, setCheckedOne] = useState(false);
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
    // axios
    //   .put(`/api/subscribed/${id}`, { subscribed: checkedOne })
    //   .then((response) => {
    //     console.log('LINE 36', response);
    //   })
    //   .catch((err) => {
    //     console.log('SubscriptionsPage.tsx error', err);
    //   });

    if (season) {
      axios
        .post(`/api/add_subscription_entry/${id}`, {
          farm_id: 1,
          season: season, // change season to number season id on server side
        })
        .then((response) => {
          console.log('LINE 56 || SUBSCRIPTIONSPAGE.TSX ||', response);
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
        value='whole year'
        type='radio'
        className='form-event'
        onChange={(e) => setSeason(e.target.value)}
      />
      <label htmlFor='season'> Whole Year </label>
      <br />
      <button className='form--submit' onClick={handleSubscribed}>
        {/* <Link to={`/confirmation-page`}>Subscribe!</Link> */}Subscribe!
      </button>
    </div>
    // </div>
  );
};

export default SubscriptionsPage;
