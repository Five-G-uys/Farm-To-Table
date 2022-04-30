/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-var-requires
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SubscriptionCard from './SubscriptionCard';

// MUI Imports
import { ThemeProvider, createTheme } from '@mui/system';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Navigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';

const SubscriptionsAdmin = ({
  handleInputSubscription,
  getAllSubscriptions,
  postSubscription,
  open,
  handleCreateForm,
  handleClose,
  commonStyles,
}: any) => {
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
  // useEffect(() => {}, [subscription.description]);

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
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        borderRadius: '2.5rem',
        boxShadow: 24,
      }}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 750,
      }}
      className='add_x_form_modal'
    >
      <Fade in={open}>
        {
          <div>
            <div>
              <Box
                sx={{
                  ...commonStyles,
                  // flexWrap: 'wrap',
                  // display: 'flex',
                  // justifyContent: 'center',
                  // borderRadius: '16px',
                }}
              >
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
                          onChange={handleInputSubscription}
                        />
                        <label htmlFor='Season'>Spring</label>
                        <br />
                        <input
                          type='radio'
                          id='Season'
                          name='season'
                          value='Autumn'
                          checked={season === 'Autumn'}
                          onChange={handleInputSubscription}
                        />
                        <label htmlFor='Season'>Autumn</label>
                        <br />
                        <input
                          type='radio'
                          id='Season'
                          name='season'
                          value='Winter'
                          checked={season === 'Winter'}
                          onChange={handleInputSubscription}
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
                        onChange={handleInputSubscription}
                        className='input'
                      />
                      <br></br>
                      <label>Flat Price</label>
                      <input
                        type='text'
                        placeholder='ex: $500'
                        value={flat_price}
                        name='flat_price'
                        onChange={handleInputSubscription}
                        className='input'
                      />
                      <label>Weekly Price</label>
                      <input
                        type='text'
                        placeholder='ex: $40'
                        value={weekly_price}
                        name='weekly_price'
                        onChange={handleInputSubscription}
                        className='input'
                      />
                      <br></br>
                      <label>Description</label>
                      <textarea
                        className='text-form'
                        placeholder='ex: A beautiful bounty of fruits and vegetables...'
                        value={description}
                        name='description'
                        onChange={handleInputSubscription}
                      ></textarea>
                      <br></br>
                      <label>Start Date</label>
                      <input
                        type='text'
                        placeholder='MM/DD/YY'
                        value={start_date}
                        name='start_date'
                        onChange={handleInputSubscription}
                        className='form-input'
                      />
                      <label>End Date</label>
                      <input
                        type='text'
                        placeholder='MM/DD/YY'
                        value={end_date}
                        name='end_date'
                        onChange={handleInputSubscription}
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
              </Box>
            </div>
          </div>
        }
      </Fade>
    </Modal>
  );
};

export default SubscriptionsAdmin;
