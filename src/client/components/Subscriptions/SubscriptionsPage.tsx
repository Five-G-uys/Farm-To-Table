/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SubscriptionsContainer from './SubscriptionsContainer';
import SubscriptionsAdmin from './SubscriptionsAdmin';
import Fab from '@mui/material/Fab';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Confirmation from '../Confirmation'

import { UserContext } from '../App';
import { updateSubscription, deleteSubscription } from './subscriptionCalls';

const SubscriptionsPage = () => {
  const user: any = useContext(UserContext);
  // console.log('THIS IS WORKING', user);
  const navigate = useNavigate();

  const [updateCounter, setUpdateCounter] = useState(0);

  // NEED TO SET USER ID TO CURRENT USER ID. RIGHT NOW IT'S ALWAYS GOING TO BE 0
  // const [id, setId] = useState(0);
  // user.id);
  // console.log('LINE 37 || SUBSCRIPTION PAGE ', user);
  const { id } = user;
  const [season, setSeason] = useState('');

  // create a stateful boolean to monitor if updating existing product (in update mode) or creating a new product entry
  const [inEditMode, setInEditMode] = useState(false);

  const [subscriptions, setSubscriptions] = useState([]);

  const [value, setValue] = React.useState('Season');

  const handleRadioBtn = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const [subscription, setSubscription] = useState({
    id: '',
    season: value,
    year: '',
    flat_price: '',
    weekly_price: '',
    description: '',
    start_date: '',
    end_date: '',
    thumbnail: '',
  });

  // state var for backdrop
  const [open, setOpen] = useState(false);

  // handle create form
  const handleCreateForm = () => {
    setOpen(true);
  };
  // Handlers for backdrop control
  const handleClose = () => {
    setOpen(false);
    setInEditMode(false);
    setSubscription({
      id: '',
      season: '',
      year: '',
      flat_price: '',
      weekly_price: '',
      description: '',
      start_date: '',
      end_date: '',
      thumbnail: '',
    });
  };

  // Box component styles
  const commonStyles = {
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    m: 1,
    // to center elements absolutely inside parent
    // add event listener to window size to resize only when certain size bounds are crossed
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    border: 1,
    padding: '20px',
    borderRadius: '2.5rem',
    boxShadow: 24,
    // width: ,
    // minWidth: 500,
    // minHeight: 500,
    // maxWidth: 1800,
    // maxHeight: 1800,
    // display: 'flex',
  };

  const handleInputSubscription = (
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
      .then((data) => {
        // console.log('saved!', data);
        setUpdateCounter(updateCounter + 1);
        handleClose();
      })
      .catch((err) => console.error(err));
  };

  // create function to handle update form submission
  const handleSubscriptionUpdateSubmit = async (e: any) => {
    e.preventDefault();
    try {
      // call async function that was imported from apiCalls/productCalls
      const result = await updateSubscription(subscription.id, subscription);
      // keep in try so it doesn't rerender on error
      setUpdateCounter(updateCounter + 1);
      handleClose();

      console.log('LINE 145 || Subscription Update', result);
    } catch (err) {
      console.error('LINE 140 || Subscription Update ', err);
    }
  };

  // create function to handle delete season submission
  const handleSubscriptionDeleteSubmit = async () => {
    try {
      // call async function that was imported from apiCalls/productCalls
      const result = await deleteSubscription(subscription.id);
      // keep in try so it doesn't rerender on error
      setUpdateCounter(updateCounter + 1);
      handleClose();

      console.log('LINE 160 || Subscription Delete', result);
    } catch (err) {
      console.error('LINE 162 || Subscription Delete ', err);
    }
  };

  const getAllSubscriptions = () => {
    axios
      .get(`/api/subscriptions/`)
      .then((data) => {
        // console.log('LINE 139 SubPage', data.data);
        setSubscriptions(data.data);
      })
      .catch((err) => {
        console.error('Line 59 subPage.tsx', err);
      });
  };

  useEffect((): void => {
    getAllSubscriptions();
  }, [updateCounter]);

  
  //SUBSCRIPTION CREATE
  const handleSubscribed = () => {
    // Insert Stripe Functionality Here
    if (season) {
      axios
        .post(`/api/add_subscription_entry/${id}`, {
          farm_id: 1,
          // this is the subscription id, or at least it needs to be. Check state
          season: subscription.id, // change season to number season id on server side
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

  const handleEditClick = (subscription_id: any) => {
    // console.log('LINE 221 || SUBSCRIPTIONS PAGE CLICKED', subscription_id);

    const clickedProduct: any = subscriptions.find(
      // find mutates original array values
      (sub: any) => sub.id === subscription_id
    );
    clickedProduct.thumbnail = clickedProduct.thumbnail
      ? clickedProduct.thumbnail
      : 'http://res.cloudinary.com/ddg1jsejq/image/upload/v1651189122/dpzvzkarpu8vjpwjsabd.jpg';
    // delete clickedProduct.updatedAt;
    // delete clickedProduct.createdAt;
    // delete clickedProduct.id;

    setSubscription({
      id: subscription_id,
      season: clickedProduct.season,
      year: clickedProduct.year,
      flat_price: clickedProduct.flat_price,
      weekly_price: clickedProduct.weekly_price,
      description: clickedProduct.description,
      start_date: clickedProduct.start_date,
      end_date: clickedProduct.end_date,
      thumbnail: clickedProduct.thumbnail,
    });
    setInEditMode(true);
    setOpen(true);
  };

  return (
    <div>
      <SubscriptionsContainer
        subscriptions={subscriptions}
        getAllSubscriptions={getAllSubscriptions}
        handleEditClick={handleEditClick}
        inEditMode={inEditMode}
        handleSubscriptionDeleteSubmit={handleSubscriptionDeleteSubmit}
      />
      <SubscriptionsAdmin
        handleInputSubscription={handleInputSubscription}
        getAllSubscriptions={getAllSubscriptions}
        postSubscription={postSubscription}
        open={open}
        subscription={subscription}
        setSubscription={setSubscription}
        handleCreateForm={handleCreateForm}
        handleClose={handleClose}
        commonStyles={commonStyles}
        handleEditClick={handleEditClick}
        inEditMode={inEditMode}
        handleSubscriptionUpdateSubmit={handleSubscriptionUpdateSubmit}
        handleSubscriptionDeleteSubmit={handleSubscriptionDeleteSubmit}
        value={value}
        handleRadioBtn={handleRadioBtn}
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
      <Button variant='contained' onClick={handleSubscribed}>
        Subscribe
      </Button>
      <Fab
        onClick={handleCreateForm}
        size='large'
        // color='secondary'
        aria-label='add'
        style={{
          transform: 'scale(1.5)',
          backgroundColor: 'lightgreen',
        }}
        sx={{
          position: 'fixed',
          bottom: (theme) => theme.spacing(8),
          right: (theme) => theme.spacing(8),
        }}
      >
        <AddIcon style={{ color: '#FFFFFF' }} />
      </Fab>
    </div>
  );
};

export default SubscriptionsPage;
