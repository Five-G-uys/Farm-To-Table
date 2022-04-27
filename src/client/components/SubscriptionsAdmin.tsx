/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-var-requires
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SubscriptionCard from './SubscriptionCard';

const SubscriptionsAdmin = () => {
  const [subscription, setSubscription] = useState({
    season: '',
    year: '',
    flat_price: '',
    weekly_price: '',
    description: '',
    start_date: '',
    end_date: '',
  });

  const handleInputEvent = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = event.target;
    setSubscription((state) => {
      return {
        ...state,
        [name]: type === 'checkbox' ? checked : value,
      };
    });
  };

  const postSubscription = () => {
    axios
      .post('/api/subscriptions-admin', {
        event: {
          season: subscription.season,
          year: subscription.year,
          flat_price: subscription.flat_price,
          weekly_price: subscription.weekly_price,
          description: subscription.description,
          start_date: subscription.start_date,
          end_date: subscription.end_date,
        },
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then((data) => console.log('saved!', data))
      .catch((err) => console.error(err));
  };

  //{ event: string; info: { url: string } })
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => {}, [subscription.description]);
  console.log(subscription);
  const {
    season,
    year,
    flat_price,
    weekly_price,
    description,
    start_date,
    end_date,
  } = subscription;

  return (
    <div className='event'>
      <h3 className='create-subscription'>Create Subscription</h3>
      <br></br>
      <div>
        <form onSubmit={postSubscription} className='form-event'>
          <fieldset>
            <legend className='radio-title'>Season</legend>
            <input
              type='radio'
              id='Season'
              name='season'
              value='Spring'
              checked={season === 'Spring'}
              onChange={handleInputEvent}
            />
            <label htmlFor='Season'>Spring</label>
            <br />
            <input
              type='radio'
              id='Season'
              name='season'
              value='Autumn'
              checked={season === 'Autumn'}
              onChange={handleInputEvent}
            />
            <label htmlFor='Season'>Autumn</label>
            <br />

            <input
              type='radio'
              id='Season'
              name='season'
              value='Winter'
              checked={season === 'Winter'}
              onChange={handleInputEvent}
            />
            <label htmlFor='Season'>Winter</label>
            <br />
          </fieldset>
          <input
            type='text'
            placeholder='Year'
            value={year}
            name='year'
            onChange={handleInputEvent}
            className='input'
          />
          <input
            type='text'
            placeholder='Flat Price'
            value={flat_price}
            name='flat_price'
            onChange={handleInputEvent}
            className='input'
          />
          <input
            type='text'
            placeholder='Weekly Price'
            value={weekly_price}
            name='weekly_price'
            onChange={handleInputEvent}
            className='input'
          />
          <br></br>
          <br></br>
          <textarea
            className='text-form'
            placeholder='Description'
            value={description}
            name='description'
            onChange={handleInputEvent}
          ></textarea>
          <br></br>
          <br></br>
          <input
            type='text'
            placeholder='DD/MM/YEAR'
            value={start_date}
            name='start_date'
            onChange={handleInputEvent}
            className='form-input'
          />
          <input
            type='text'
            placeholder='DD/MM/YEAR'
            value={end_date}
            name='end_date'
            onChange={handleInputEvent}
            className='form-input'
          />
          <br></br>
          <br></br>
          <button type='submit' className='form--submit'>
            Create Subscription
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionsAdmin;
