// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import GoogleCalendar from './GoogleCalendar';

// interface AppProps {
//   event: [];
// }

// const style = {
//   position: 'absolute' as const,
//   top: '50%',
//   left: '50%',
//   right: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: '90vw',
//   height: '70vh',
//   bgcolor: 'transparent',
//   // border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

// const Sidebar = ({ event }: AppProps) => {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   return (
//     <div>
//       <Button onClick={handleOpen}>Calendar View for Events</Button>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby='keep-mounted-modal-title'
//         // aria-describedby='keep-mounted-modal-description'
//       >
//         {/* <Box sx={style}> */}
//         <GoogleCalendar event={event} />
//         {/* </Box> */}
//       </Modal>
//     </div>
//   );
// };
// export default Sidebar;
