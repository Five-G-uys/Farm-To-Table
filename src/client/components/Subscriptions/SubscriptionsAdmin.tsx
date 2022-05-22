// Import Dependencies
import React from 'react';

// MUI Imports
import { FormLabel, Fade, Modal, FormControl, Backdrop, Button, TextField, Box, Stack } from '@mui/material';

const SubscriptionsAdmin = ({
  handleInputSubscription,
  getAllSubscriptions,
  postSubscription,
  handleSubscriptionUpdateSubmit,
  open,
  inEditMode,
  subscription,
  setSubscription,
  handleCreateForm,
  handleClose,
  commonStyles,
  value,
  setValue,
  handleRadioBtn,
}: any) => {
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setSubscription((state: any) => {
            return {
              ...state,
              thumbnail: result.info.url,
            };
          });
        }
      },
    );
    widget.open();
  };

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
      disableScrollLock='true'
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
      <Fade in={open} timeout={{ appear: 300, enter: 300, exit: 400 }}>
        {
          <div>
            <div>
              <Box
                sx={{
                  ...commonStyles,
                  maxHeight: '90vh',
                  flexWrap: 'wrap',
                  display: 'flex',
                  flexDirection: 'column',
                  overflowY: 'scroll',
                  // overflow: 'hidden',
                }}
              >
                <form
                  onSubmit={
                    inEditMode
                      ? handleSubscriptionUpdateSubmit
                      : postSubscription
                  }
                >
                  <br></br>
                  {thumbnail && (
                    <img width={'100%'} src={thumbnail} border-radius='2rem' />
                  )}
                  <br></br>
                  <Box>
                    <FormControl fullWidth sx={{ m: 1 }} variant='standard'>
                      {' '}
                      <FormLabel id='demo-radio-buttons-group-label'>
                        <h3 className='create-subscription'>Create Season</h3>
                      </FormLabel>
                    </FormControl>
                  </Box>
                  <TextField
                    id='filled-basic'
                    variant='filled'
                    fullWidth
                    value={season}
                    name='season'
                    label='Season'
                    placeholder='ex: Spring'
                    onChange={(e) => handleInputSubscription(e)}
                  />
                  <br></br>
                  <br></br>
                  <TextField
                    id='filled-basic'
                    variant='filled'
                    fullWidth
                    value={year}
                    name='year'
                    label='Year'
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
                    placeholder='MM/DD/YYYY'
                    onChange={handleInputSubscription}
                  />
                  <br></br>
                  <br></br>
                  <Stack direction='row' justifyContent='space-between'>
                    <Button
                      variant='text'
                      size='large'
                      color='success'
                      sx={{ color: 'green' }}
                      onClick={showWidget}
                    >
                      Add Subscription Image
                    </Button>
                    <br></br>
                    <br></br>
                    <Button
                      variant='text'
                      size='large'
                      color='success'
                      type='submit'
                      sx={{ color: 'green' }}
                    >
                      {handleInputSubscription ? 'SAVE' : 'UPDATE'}
                    </Button>
                  </Stack>
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
