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
    thumbnail: '',
  });

  const handleInputEvent = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setSubscription((state) => {
      return {
        ...state,
        [name]: value,
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
          thumbnail: subscription.thumbnail,
        },
      })
      .then((data) => console.log('saved!', data))
      .catch((err) => console.error(err));
  };

  const CLOUD_NAME = process.env.CLOUD_NAME;
  const CLOUD_PRESET2 = process.env.CLOUD_PRESET2;
  const showWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: CLOUD_NAME,
        uploadPreset: CLOUD_PRESET2,
      },
      (error: unknown, result: { event: string; info: { url: string } }) => {
        if (!error && result && result.event === 'success') {
          // console.log("LINE 62", result.info.url);
          setSubscription((state) => {
            return {
              ...state,
              thumbnail: result.info.url,
            };
          });
        }
      }
    );
    widget.open();
  };

  //{ event: string; info: { url: string } })
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => {}, [subscription.description]);

  const {
    season,
    year,
    flat_price,
    weekly_price,
    description,
    start_date,
    end_date,
    thumbnail,
  } = subscription;

  return (
    <div className='event'>
      <h3 className='create-subscription'>Create Subscription</h3>
      <br></br>
      <button onClick={showWidget} className='input-btn'>
        Add image
      </button>
      <br></br>
      {thumbnail && <img src={thumbnail} />}
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
          <label>Year</label>
          <input
            type='text'
            placeholder='ex: 2022'
            value={year}
            name='year'
            onChange={handleInputEvent}
            className='input'
          />
          <br></br>
          <label>Flat Price</label>
          <input
            type='text'
            placeholder='ex: $500'
            value={flat_price}
            name='flat_price'
            onChange={handleInputEvent}
            className='input'
          />
          <label>Weekly Price</label>
          <input
            type='text'
            placeholder='ex: $40'
            value={weekly_price}
            name='weekly_price'
            onChange={handleInputEvent}
            className='input'
          />
          <br></br>
          <label>Description</label>
          <textarea
            className='text-form'
            placeholder='ex: A beautiful bounty of fruits and vegetables...'
            value={description}
            name='description'
            onChange={handleInputEvent}
          ></textarea>
          <br></br>
          <label>Start Date</label>
          <input
            type='text'
            placeholder='MM/DD/YY'
            value={start_date}
            name='start_date'
            onChange={handleInputEvent}
            className='form-input'
          />
          <label>End Date</label>
          <input
            type='text'
            placeholder='MM/DD/YY'
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
