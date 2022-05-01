/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-var-requires
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SubscriptionCard from './SubscriptionCard';

// MUI Imports
import { ThemeProvider, createTheme } from '@mui/system';
import { Navigate } from 'react-router-dom';
import {
  RadioGroup,
  Radio,
  FormLabel,
  FormControlLabel,
  Fade,
  Modal,
  Typography,
  InputAdornment,
  InputLabel,
  Input,
  FormControl,
  Backdrop,
  Button,
  Fab,
  TextField,
  Box,
} from '@mui/material';

const SubscriptionsAdmin = ({
  handleInputSubscription,
  getAllSubscriptions,
  postSubscription,
  open,
  subscription,
  handleCreateForm,
  handleClose,
  commonStyles,
}: any) => {
  console.log('LINE 40 OPEN', open);

  // const [subscription, setSubscription] = useState({
  //   id: '',
  //   season: '',
  //   year: '',
  //   flat_price: '',
  //   weekly_price: '',
  //   description: '',
  //   start_date: '',
  //   end_date: '',
  //   thumbnail: '',
  // });

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

  console.log('LINE 89', subscription);

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
                <form onSubmit={postSubscription}>
                  <h3 className='create-subscription'>Create Subscription</h3>
                  <Button variant='contained' size='large' onClick={showWidget}>
                    Add Product Image
                  </Button>
                  <br></br>
                  {thumbnail && <img width={300} src={thumbnail} />}
                  <br></br>
                  <FormControl fullWidth sx={{ m: 1 }} variant='standard'>
                    {' '}
                    {/* <InputLabel htmlFor='standard-adornment-amount'>
                      Season
                    </InputLabel> */}
                    <FormLabel id='demo-radio-buttons-group-label'>
                      Season
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby='demo-radio-buttons-group-label'
                      defaultValue='spring'
                      name='controlled-radio-buttons-group'
                      value={season}
                      onChange={handleInputSubscription}
                    >
                      <FormControlLabel
                        value='spring'
                        checked={season === 'spring'}
                        control={<Radio size='small' />}
                        label='Spring'
                      />
                      <FormControlLabel
                        value='fall'
                        checked={season === 'fall'}
                        control={<Radio size='small' />}
                        label='Fall'
                      />
                      <FormControlLabel
                        value='winter'
                        checked={season === 'winter'}
                        control={<Radio size='small' />}
                        label='Winter'
                      />
                    </RadioGroup>
                  </FormControl>
                  <TextField
                    // width='75%'
                    // type={{ width: '75%' }}
                    id='filled-basic'
                    variant='filled'
                    // label='Filled'
                    value={year}
                    name='year'
                    label='Year'
                    // id='fullWidth'
                    placeholder='ex: 2022'
                    onChange={(e) => handleInputSubscription(e)}
                  />
                  <br></br>
                  <br></br>
                  <TextField
                    fullWidth
                    id='filled-basic'
                    variant='filled'
                    value={flat_price}
                    name='flat_price'
                    label='Flat Price'
                    // id='fullWidth'
                    placeholder='400'
                    onChange={handleInputSubscription}
                  />
                  <br></br>
                  <br></br>
                  <TextField
                    fullWidth
                    id='filled-basic'
                    variant='filled'
                    value={weekly_price}
                    name='weekly_price'
                    label='Weekly Price'
                    // id='fullWidth'
                    placeholder='40'
                    onChange={handleInputSubscription}
                  />
                  <br></br>
                  <br></br>
                  <TextField
                    fullWidth
                    id='filled-basic'
                    variant='filled'
                    value={description}
                    name='description'
                    label='Description'
                    // id='fullWidth'
                    placeholder='ex: A beautiful harvest of...'
                    onChange={handleInputSubscription}
                  />
                  <br></br>
                  <br></br>
                  <TextField
                    fullWidth
                    id='filled-basic'
                    variant='filled'
                    value={start_date}
                    name='start_date'
                    label='Start Date'
                    // id='fullWidth'
                    placeholder='MM/DD/YYYY'
                    onChange={handleInputSubscription}
                  />
                  <br></br>
                  <br></br>
                  <TextField
                    fullWidth
                    id='filled-basic'
                    variant='filled'
                    value={end_date}
                    name='end_date'
                    label='End Date'
                    // id='fullWidth'
                    placeholder='MM/DD/YYYY'
                    onChange={handleInputSubscription}
                  />
                  <br></br>
                  <br></br>
                  <Button variant='contained' size='large' type='submit'>
                    {handleInputSubscription ? 'UPDATE' : 'CREATE'}
                  </Button>
                  <br></br>
                  <br></br>
                </form>
              </Box>
            </div>
          </div>
        }
      </Fade>
    </Modal>
  );
};

export default SubscriptionsAdmin;

{
  /* <input
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
                  </div>*/
}
