import React, { useState, useContext } from 'react';

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
  Slide,
  Stack,
} from '@mui/material';

const AddressForm = ({
  handleAddressForm,
  handleAddressFormClose,
  handleInputAddress,
  handleSubscribed,
  addressOpen,
  commonStyles,
  address,
}: any) => {
  // state var

  const { streetAddress, city, state, zip } = address;
  return (
    <div>
      {' '}
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          borderRadius: '2.5rem',
          boxShadow: 24,
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
                    // flexWrap: 'wrap',
                    // display: 'flex',
                    // justifyContent: 'center',
                    // borderRadius: '16px',
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
                      placeholder='City'
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
                      placeholder='State'
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
                      placeholder='Zip code'
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
                      >
                        SUBSCRIBE
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

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import StepLabel from '@mui/material/StepLabel';
// import StepContent from '@mui/material/StepContent';
// import Button from '@mui/material/Button';
// import Paper from '@mui/material/Paper';
// import Typography from '@mui/material/Typography';

// const steps = [
//   {
//     label: 'Select campaign settings',
//     description: `For each ad campaign that you create, you can control how much
//               you're willing to spend on clicks and conversions, which networks
//               and geographical locations you want your ads to show on, and more.`,
//   },
//   {
//     label: 'Create an ad group',
//     description:
//       'An ad group contains one or more ads which target a shared set of keywords.',
//   },
//   {
//     label: 'Create an ad',
//     description: `Try out different ad text to see what brings in the most customers,
//               and learn how to enhance your ads using features like ad extensions.
//               If you run into any problems with your ads, find out how to tell if
//               they're running and how to resolve approval issues.`,
//   },
// ];

// export default function VerticalLinearStepper() {
//   const [activeStep, setActiveStep] = React.useState(0);

//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleReset = () => {
//     setActiveStep(0);
//   };

//   return (
//     <Box sx={{ maxWidth: 400 }}>
//       <Stepper activeStep={activeStep} orientation="vertical">
//         {steps.map((step, index) => (
//           <Step key={step.label}>
//             <StepLabel
//               optional={
//                 index === 2 ? (
//                   <Typography variant="caption">Last step</Typography>
//                 ) : null
//               }
//             >
//               {step.label}
//             </StepLabel>
//             <StepContent>
//               <Typography>{step.description}</Typography>
//               <Box sx={{ mb: 2 }}>
//                 <div>
//                   <Button
//                     variant="contained"
//                     onClick={handleNext}
//                     sx={{ mt: 1, mr: 1 }}
//                   >
//                     {index === steps.length - 1 ? 'Finish' : 'Continue'}
//                   </Button>
//                   <Button
//                     disabled={index === 0}
//                     onClick={handleBack}
//                     sx={{ mt: 1, mr: 1 }}
//                   >
//                     Back
//                   </Button>
//                 </div>
//               </Box>
//             </StepContent>
//           </Step>
//         ))}
//       </Stepper>
//       {activeStep === steps.length && (
//         <Paper square elevation={0} sx={{ p: 3 }}>
//           <Typography>All steps completed - you&apos;re finished</Typography>
//           <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
//             Reset
//           </Button>
//         </Paper>
//       )}
//     </Box>
//   );
// }
