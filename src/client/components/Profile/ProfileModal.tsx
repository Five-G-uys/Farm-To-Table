// // Import Dependencies
// import React from 'react';

// // MUI Imports
// import {
//   FormLabel,
//   Fade,
//   Modal,
//   FormControl,
//   Backdrop,
//   Button,
//   TextField,
//   Box,
//   Stack,
// } from '@mui/material';

// const ProfileModal = ({
//   postSubscription,
//   open,
//   inEditMode,
//   profile,
//   setProfile,
//   handleClose,
//   commonStyles,
//   handleProfileUpdateSubmit,
//   handleInputProfile,
// }: any) => {
//   const CLOUD_NAME = process.env.CLOUD_NAME;
//   const CLOUD_PRESET2 = process.env.CLOUD_PRESET2;
//   const showWidget = () => {
//     const widget = window.cloudinary.createUploadWidget(
//       {
//         cloudName: CLOUD_NAME,
//         uploadPreset: CLOUD_PRESET2,
//       },
//       (error: unknown, result: { event: string; info: { url: string } }) => {
//         if (!error && result && result.event === 'success') {
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           setProfile((state: any) => {
//             return {
//               ...state,
//               picture: result.info.url,
//             };
//           });
//         }
//       },
//     );
//     widget.open();
//   };

//   const { name, email, phone, dietaryRestriction, picture } = profile;
//   console.log('line 53', profile);

//   return (
//     <Modal
//       disableScrollLock={true}
//       aria-labelledby='transition-modal-title'
//       aria-describedby='transition-modal-description'
//       sx={{
//         color: '#fff',
//         zIndex: (theme) => theme.zIndex.drawer + 1,
//         borderRadius: '1rem',
//         boxShadow: 24,
//       }}
//       open={open}
//       onClose={handleClose}
//       closeAfterTransition
//       BackdropComponent={Backdrop}
//       BackdropProps={{
//         timeout: 750,
//       }}
//       className='add_x_form_modal'
//     >
//       <Fade in={open} timeout={{ appear: 300, enter: 300, exit: 400 }}>
//         {
//           <Box
//             sx={{
//               ...commonStyles,
//               maxHeight: '90vh',
//               flexWrap: 'wrap',
//               display: 'flex',
//               flexDirection: 'column',
//             }}
//           >
//             <form
//               onSubmit={
//                 inEditMode ? handleProfileUpdateSubmit : postSubscription
//               }
//             >
//               {picture && (
//                 <img width={'100%'} src={picture} border-radius='2rem' />
//               )}
//               <Box>
//                 <FormControl fullWidth sx={{ m: 1 }} variant='standard'>
//                   {' '}
//                   <FormLabel id='demo-radio-buttons-group-label'>
//                     <h3 className='create-subscription'>Update Profile</h3>
//                   </FormLabel>
//                 </FormControl>
//               </Box>
//               <TextField
//                 id='filled-basic'
//                 variant='filled'
//                 fullWidth
//                 value={name}
//                 name='name'
//                 label='Name'
//                 placeholder='ex: Jane Doe'
//                 onChange={(e) => handleInputProfile(e)}
//               />
//               <br></br>
//               <br></br>
//               <TextField
//                 id='filled-basic'
//                 variant='filled'
//                 fullWidth
//                 value={email}
//                 name='email'
//                 label='E-mail'
//                 placeholder='ex: janedoe@email.com'
//                 onChange={(e) => handleInputProfile(e)}
//               />
//               <br></br>
//               <br></br>
//               <TextField
//                 fullWidth
//                 id='filled-basic'
//                 variant='filled'
//                 value={phone}
//                 name='phone'
//                 label='Phone'
//                 placeholder='(555) 555-5555'
//                 onChange={handleInputProfile}
//               />
//               <br></br>
//               <br></br>
//               <TextField
//                 fullWidth
//                 id='filled-basic'
//                 variant='filled'
//                 value={dietaryRestriction}
//                 name='dietaryRestriction'
//                 label='Dietary Restrictions'
//                 placeholder='Ex: Dairy, Gluten, Nuts, etc'
//                 onChange={handleInputProfile}
//               />
//               <br></br>
//               <br></br>
//               <Stack direction='row' justifyContent='space-between'>
//                 <Button
//                   variant='text'
//                   size='large'
//                   color='success'
//                   sx={{ color: 'green' }}
//                   onClick={showWidget}
//                 >
//                   Add Subscription Image
//                 </Button>
//                 <br></br>
//                 <br></br>
//                 <Button
//                   variant='text'
//                   size='large'
//                   color='success'
//                   type='submit'
//                   sx={{ color: 'green' }}
//                 >
//                   {handleInputProfile ? 'SAVE' : 'UPDATE'}
//                 </Button>
//               </Stack>
//             </form>
//           </Box>
//         }
//       </Fade>
//     </Modal>
//   );
// };

// export default ProfileModal;
