/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../App';
import { updateSubscription } from './subscriptionCalls';
import { useNavigate } from 'react-router-dom';

// MUI IMPORTS
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

// COMPONENT IMPORTS
import HomePage from '../HomePage';
import SubscriptionsContainer from './SubscriptionsContainer';
import SubscriptionsAdmin from './SubscriptionsAdmin';
import AddressForm from './AddressForm';
import { padding } from '@mui/system';

const SubscriptionsPage = () => {
  const user: any = useContext(UserContext);
  const { id, roleId } = user;
  // const navigate = useNavigate();

  const [updateCounter, setUpdateCounter] = useState(0);

  // create a stateful boolean to monitor if updating existing product (in update mode) or creating a new product entry
  const [inEditMode, setInEditMode] = useState(false);

  const [subscriptions, setSubscriptions] = useState([]);

  const [subscription, setSubscription] = useState({
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

  // state var for form modal and backdrop
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
  //////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////

  // create state var for each address component (street, city, state, zip)
  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState(null);

  const [address, setAddress] = useState({
    streetAddress: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
  });

  // state var for address form control
  const [addressOpen, setAddressOpen] = useState(false);
  // handle open address form
  const handleAddressForm = (subId: any) => {
    setSelectedSubscriptionId(subId);
    setAddressOpen(true);
  };
  // set address state vars and handle close address form
  const handleAddressFormClose = () => {
    setAddressOpen(false);
    setAddress({
      streetAddress: '',
      city: '',
      state: '',
      zip: '',
      phone: '',
    });
  };

  const handleInputAddress = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setAddress((state) => {
      return {
        ...state,
        [name]: value,
      };
    });
  };

  //SUBSCRIPTION CREATE
  const handleSubscribed = (event: any) => {
    event.preventDefault();
    // Insert Stripe Functionality Here
    // WE NEED TO ADD ADDRESS VALUES TO INITIAL POST REQUEST TO CREATE SUBSCRIPTION ENTRY
    axios
      .post(`/api/add_subscription_entry/${id}`, {
        subscriptionId: selectedSubscriptionId, // change season to number season id on server side
        streetAddress: address.streetAddress,
        city: address.city,
        state: address.state,
        zip: address.zip,
        phone: address.phone,
      })
      .then((data) => {
        console.log('LINE 159 || SUBSCRIPTIONS PAGE', data);
        // navigate('/subscriptions-page/confirmation-page');
      })
      .catch((err) => {
        console.error('LINE 59 || SUBSCRIPTIONSPAGE ERROR', err);
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

  const postSubscription = () => {
    axios
      .post('/api/subscriptions', {
        season: subscription.season,
        year: subscription.year,
        flat_price: subscription.flat_price,
        weekly_price: subscription.weekly_price,
        description: subscription.description,
        start_date: subscription.start_date,
        end_date: subscription.end_date,
        thumbnail: subscription.thumbnail,
      })
      .then(() => {
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
    } catch (err) {
      console.error('LINE 140 || Subscription Update ', err);
    }
  };

  const deleteSubscription = (subscriptionId: any) => {
    const clickedSubscription: any = subscriptions.find(
      // find mutates original array values
      (sub: any) => sub.id === subscriptionId
    );
    axios
      .delete(`/api/subscriptions/${clickedSubscription.id}`, {
        params: { id: clickedSubscription.id },
      })
      .then(() => {
        getAllSubscriptions();
      })
      .catch((err) => {
        console.error('69 REQUEST FAILED', err);
      });
  };

  const getAllSubscriptions = () => {
    axios
      .get(`/api/subscriptions`)
      .then((data) => {
        setSubscriptions(data.data);
      })
      .catch((err) => {
        console.error('Line 59 subPage.tsx', err);
      });
  };

  useEffect((): void => {
    getAllSubscriptions();
  }, [updateCounter]);

  const handleEditClick = (subscriptionId: any) => {
    const clickedSubscription: any = subscriptions.find(
      // find mutates original array values
      (sub: any) => sub.id === subscriptionId
    );
    clickedSubscription.thumbnail = clickedSubscription.thumbnail
      ? clickedSubscription.thumbnail
      : 'http://res.cloudinary.com/ddg1jsejq/image/upload/v1651189122/dpzvzkarpu8vjpwjsabd.jpg';

    setSubscription({
      id: subscriptionId,
      season: clickedSubscription.season,
      year: clickedSubscription.year,
      flat_price: clickedSubscription.flat_price,
      weekly_price: clickedSubscription.weekly_price,
      description: clickedSubscription.description,
      start_date: clickedSubscription.start_date,
      end_date: clickedSubscription.end_date,
      thumbnail: clickedSubscription.thumbnail,
    });
    setInEditMode(true);
    setOpen(true);
  };

  const handleCheckout = () => {
    // console.log('Checkout');
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

  return (
    <div style={{ marginTop: '10vh' }}>
      <div>
        <Typography
          component='h1'
          variant='h2'
          align='center'
          color='text.primary'
          gutterBottom
        >
          Your bounty awaits...
        </Typography>
        <Typography
          variant='h5'
          align='center'
          color='text.secondary'
          paragraph
        >
          Subscribe today and start receiving farm freshness!
        </Typography>
        <SubscriptionsContainer
          style={commonStyles}
          subscriptions={subscriptions}
          subscription={subscription}
          getAllSubscriptions={getAllSubscriptions}
          handleEditClick={handleEditClick}
          inEditMode={inEditMode}
          handleAddressForm={handleAddressForm}
          deleteSubscription={deleteSubscription}
        />
        <AddressForm
          handleAddressForm={handleAddressForm}
          handleAddressFormClose={handleAddressFormClose}
          addressOpen={addressOpen}
          handleInputAddress={handleInputAddress}
          handleSubscribed={handleSubscribed}
          commonStyles={commonStyles}
          address={address}
          deleteSubscription={deleteSubscription}
          handleCheckout={handleCheckout}
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
          // value={value}
          // setValue={setValue}
          // handleRadioBtn={handleRadioBtn}
        />
        {roleId > 3 && (
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
        )}
      </div>
    </div>
  );
};

export default SubscriptionsPage;
