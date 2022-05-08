// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState } from 'react';
// import Grid from '@material-ui/core/Grid';
// import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import Radio from '@material-ui/core/Radio';
// import Button from '@material-ui/core/Button';
// const defaultValues = {
//   address: '',
//   phone: 0,
//   payment: '',
// };
// const Confirmation = () => {
//   const [formValues, setFormValues] = useState(defaultValues);
//   const handleInputChange = (e: { target: { name: any; value: any } }) => {
//     const { name, value } = e.target;
//     setFormValues({
//       ...formValues,
//       [name]: value,
//     });
//   };

//   const handleCheckout = () => {
//     // console.log('Checkout');
//     fetch('/create-checkout-session', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       // Send along all the information about the items
//       body: JSON.stringify({
//         items: [
//           {
//             id: 1,
//             quantity: 2,
//           },
//           {
//             id: 2,
//             quantity: 1,
//           },
//         ],
//       }),
//     })
//       .then((res) => {
//         if (res.ok) return res.json();
//         // If there is an error then make sure we catch that
//         return res.json().then((e) => Promise.reject(e));
//       })
//       .then(({ url }) => {
//         // On success redirect the customer to the returned URL
//         // console.log(url);
//         window.location = url
//       })
//       .catch((e) => {
//         console.error(e.error);
//       })
//   };

//   const handleSubmit = (event: { preventDefault: () => void }) => {
//     event.preventDefault();
//     console.log(formValues);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <Grid container alignItems='center' justify='center' direction='column'>
//         <Grid item>
//           <TextField
//             id='address-input'
//             name='address'
//             label='Address'
//             type='text'
//             value={formValues.address}
//             onChange={handleInputChange}
//           />
//         </Grid>
//         <Grid item>
//           <TextField
//             id='phone-input'
//             name='phone'
//             label='Phone'
//             type='text'
//             value={formValues.phone}
//             onChange={handleInputChange}
//           />
//         </Grid>
//         <Grid item>
//           <FormControl>
//             <FormLabel>Payment</FormLabel>
//             <RadioGroup
//               name='payment'
//               value={formValues.payment}
//               onChange={handleInputChange}
//               row
//             >
//               <FormControlLabel
//                 key='credit'
//                 value='credit'
//                 control={<Radio size='small' />}
//                 label='Credit'
//               />
//               <FormControlLabel
//                 key='cod'
//                 value='cod'
//                 control={<Radio size='small' />}
//                 label='C.O.D'
//               />
//               <FormControlLabel
//                 key='venmo'
//                 value='venmo'
//                 control={<Radio size='small' />}
//                 label='Venmo'
//               />
//             </RadioGroup>
//           </FormControl>
//         <button className='form--submit' onClick={handleCheckout}>
//           Pay Now!
//         </button>
//         </Grid>
//         {/* <Button variant='contained' color='primary' type='submit'>
//           Submit
//         </Button> */}
//       </Grid>
//     </form>
//   );
// };
// export default Confirmation;
