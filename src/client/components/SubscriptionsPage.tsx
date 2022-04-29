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
    id: 0,
    season: '',
    year: 0,
    flat_price: 0,
    weekly_price: 0,
    description: '',
    start_date: '',
    end_date: '',
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
        // console.log('LINE 46 SubscriptionPage.tsx', response);
      })
      .catch((err) => {
        console.error('Line 49 subPage.tsx', err);
      });
  }, []);

  //SUBSCRIPTION CREATE
  const handleSubscribed = () => {
    if (season) {
      axios
        .post(`/api/add_subscription_entry/${id}`, {
          farm_id: 1,
          season: season, // change season to number season id on server side
        })
        .then(() => {
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

  // SUBSCRIPTION EDITS
  const { subArray } = subscription;

  // const handleSeasonEdits = () => {
  //   if (subArray) {
  //     console.log('LINE 75', subArray);
  //     axios
  //       .put(`/api/subscriptions/${id}`, {
  //         farm_id: 1,
  //         season: subArray.season,
  //         year: subArray.year,
  //         flat_price: subArray.flat_price,
  //         weekly_price: subArray.weekly_price,
  //         description: subArray.description,
  //         start_date: subArray.start_date,
  //         end_date: subArray.end_date,
  //       })
  //       .then((data) => {
  //         console.log('SUCCESS EDIT', data);
  //       })
  //       .catch((err) => {
  //         console.error('SUBSCRIPTION EDIT ERROR', err);
  //       });
  //   }
  // };

  // SUBSCRIPTION DELETE
  // make a DELETE request to handle delete
  const handleDeleteSubscription = () => {
    axios
      .delete(`/api/subscriptions/${subscription.id}`)
      .then(() => {
        console.log('Subscription DELETE Success!');
      })
      .catch((err) => console.error(err));
  };

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
            // handleSeasonEdits: () => void;
            // handleDeleteSubscription: () => void;
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
                // handleSeasonEdits={handleSeasonEdits}
                handleDeleteSubscription={handleDeleteSubscription}
              />
            );
          }
        )}
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
      <button className='form--submit' onClick={handleSubscribed}>
        {/* <Link to={`/confirmation-page`}>Subscribe!</Link> */}Subscribe!
      </button>
    </div>
    // </div>
  );
};

export default SubscriptionsPage;
