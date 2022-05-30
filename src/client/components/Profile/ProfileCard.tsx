// // React Imports
// import React, { useState, useContext } from 'react';

// // Component Imports
// import { UserContext } from '../App';

// // MUI Import
// import IconButton, { IconButtonProps } from '@mui/material/IconButton';
// import { styled } from '@mui/material/styles';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import Avatar from '@mui/material/Avatar';
// import Card from '@mui/material/Card';
// import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
// import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
// import Collapse from '@mui/material/Collapse';
// import { red } from '@mui/material/colors';
// import Typography from '@mui/material/Typography';
// import EditIcon from '@mui/icons-material/Edit';
// import Stack from '@mui/material/Stack';

// // Other Module Imports;
// import dayjs from 'dayjs';
// import { Button } from '@mui/material';
// import { Box } from '@mui/system';
// import email from 'material-ui/svg-icons/communication/email';
// // import RSVPS from '../RSVPS/RSVPS';

// interface ExpandMoreProps extends IconButtonProps {
//   expand: boolean;
// }

// const ExpandMore = styled((props: ExpandMoreProps) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//   marginLeft: 'auto',
//   transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

// const ProfileCard = ({ order, handleOpen, handleEditClick }: any) => {
//   // expanded state var
//   const [expanded, setExpanded] = useState(false);
//   const user: any = useContext(UserContext);
//   // toggle bool
//   // console.log('LINE 49 || ORDERCARD', user.roleId);
//   const handleExpandClick = () => {
//     setExpanded(!expanded);
//   };

//   // MAP OVER ALL PRODUCTS IN EACH ORDER INSIDE OF THE COLLAPSE
//   // console.log('LINE 55 || ORDER OBJECT', order);
//   return (
//     <div>
//       <Box justifyContent='center' display='flex' alignItems='center'>
//         <Card
//           sx={{
//             marginLeft: '250px',
//             marginRight: '250px',
//             maxWidth: '500px',
//             backgroundColor: '#e2f2d9',
//             borderRadius: '2rem',
//             boxShadow: 8,
//             justifyContent: 'center',
//           }}
//           className='texture2'
//         >
//           <CardHeader
//             avatar={
//               <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
//                 {name[0]}
//               </Avatar>
//             }
//             subheader={`Email: ${email}`}
//             title={name}
//           />
//           <Stack spacing={5} direction='row' id='user_card_stack'>
//             <CardMedia image={user.picture} component='img' height='194' />
//             <CardContent>ADDRESS</CardContent>
//           </Stack>
//           <CardActions disableSpacing sx={{ justifyContent: 'center' }}>
//             <Stack spacing={5} direction='row' id='user_card_stack'>
//               <Button
//                 variant='text'
//                 size='large'
//                 color='success'
//                 sx={{ color: 'green' }}
//                 onClick={showWidget}
//               >
//                 Change User Image
//               </Button>
//               <Button
//                 variant='text'
//                 size='large'
//                 color='warning'
//                 sx={{ color: 'red' }}
//                 onClick={handleLogout}
//               >
//                 Logout
//               </Button>
//               <ExpandMore
//                 sx={{ color: 'green' }}
//                 expand={expanded}
//                 onClick={handleExpandClick}
//                 aria-expanded={expanded}
//                 aria-label='show more'
//               >
//                 <ExpandMoreIcon />
//               </ExpandMore>
//             </Stack>
//           </CardActions>

//           <Collapse in={expanded} timeout='auto' unmountOnExit>
//             <CardContent>
//               {/* User Orders */}
//               <RSVPS />
//             </CardContent>
//           </Collapse>
//         </Card>
//       </Box>
//       <br></br>
//       <br></br>
//       <br></br>
//       <br></br>
//     </div>
//   );
// };

// export default ProfileCard;
