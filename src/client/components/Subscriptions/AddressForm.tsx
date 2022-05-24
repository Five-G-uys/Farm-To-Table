// Import Dependencies
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Fade,
  Modal,
  Backdrop,
  Button,
  TextField,
  Box,
  Stack,
} from '@mui/material';

const AddressForm = ({
  handleAddressFormClose,
  handleInputAddress,
  handleSubscribed,
  handleCheckout,
  addressOpen,
  commonStyles,
  address,
}: any) => {
  // state var
  const navigate = useNavigate();

  const handleSkipCheckout = async () => {
    await handleSubscribed();
    const path = `/orders-page`;
    navigate(path);
  };

  const { streetAddress, city, state, zip, phone } = address;
  return (
    <div>
      {' '}
      <Modal
        disableScrollLock={true}
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          borderRadius: '2.5rem',
          boxShadow: 24,
          overflow: 'auto',
        }}
        open={addressOpen}
        onClose={handleAddressFormClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 750,
        }}
        className='add_x_form_modal'
      >
        <Fade in={addressOpen} timeout={{ appear: 300, enter: 300, exit: 400 }}>
          {
            <div>
              <div>
                <Box
                  sx={{
                    ...commonStyles,
                    overflow: 'auto',
                  }}
                >
                  <form onSubmit={handleSubscribed}>
                    <br></br>

                    <TextField
                      fullWidth
                      border-radius='1rem'
                      id='filled-basic'
                      variant='filled'
                      label='Street Address'
                      name='streetAddress'
                      value={streetAddress}
                      placeholder='123 HelloWorldStreet'
                      onChange={handleInputAddress}
                    />
                    <br></br>
                    <br></br>
                    <TextField
                      fullWidth
                      id='filled-basic'
                      variant='filled'
                      value={city}
                      name='city'
                      label='City'
                      placeholder='New Orleans'
                      onChange={handleInputAddress}
                    />
                    <br></br>
                    <br></br>
                    <TextField
                      fullWidth
                      id='filled-basic'
                      variant='filled'
                      value={state}
                      name='state'
                      label='State'
                      // id='fullWidth'
                      placeholder='LA'
                      onChange={handleInputAddress}
                    />
                    <br></br>
                    <br></br>
                    <TextField
                      fullWidth
                      id='filled-basic'
                      variant='filled'
                      value={zip}
                      name='zip'
                      label='Zip'
                      placeholder='12121'
                      onChange={handleInputAddress}
                    />
                    <br></br>
                    <br></br>
                    <TextField
                      fullWidth
                      id='filled-basic'
                      variant='filled'
                      value={phone}
                      name='phone'
                      label='Phone'
                      placeholder='(555) 555-5555'
                      onChange={handleInputAddress}
                    />
                    <br></br>
                    <br></br>

                    <Stack
                      direction='row'
                      // divider={
                      //   <Divider
                      //     orientation='vertical'
                      //     variant='middle'
                      //     flexItem
                      //     light
                      //   />
                      // }
                      justifyContent='space-between'
                    >
                      <Button
                        variant='text'
                        size='large'
                        type='submit'
                        sx={{ color: 'green' }}
                        onClick={handleCheckout}
                      >
                        PAY NOW
                      </Button>
                      <Button
                        variant='text'
                        size='large'
                        type='submit'
                        // sx={{ color: 'success' }}
                        onClick={handleSkipCheckout}
                      >
                        PAY UPON DELIVERY
                      </Button>
                    </Stack>
                    <br></br>
                  </form>
                </Box>
              </div>
            </div>
          }
        </Fade>
      </Modal>
    </div>
  );
};

export default AddressForm;
