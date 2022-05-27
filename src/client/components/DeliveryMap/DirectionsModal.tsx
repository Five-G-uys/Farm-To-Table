import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Backdrop, CardContent, Collapse } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import UpcomingOrderDirectionsList from './UpcomingOrderDirectionsList';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

// PASS EXPANDMORE THROUGH PROPS FROM PARENT: ALSO USED IN product CARD COMPONENT
const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const DirectionsModal = ({ open, handleClose, popupInfo }: any) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left:
      Number(popupInfo.location[0]) > -90.1 &&
      Number(popupInfo.location[0]) < -90.11
        ? '60%'
        : Number(popupInfo.location[0]) > -90.10436932015816
        ? '60%'
        : '10%',
    transform: 'translateY(-50%)',
    bgcolor: '#e2f2d9',
    // border: '2px solid lightgray',
    borderColor: 'text.primary',
    boxShadow: 8,
    borderRadius: '1.2rem',
    p: 4,
    maxHeight: '90vh',

    width: '30vw',
    minWidth: '300px',
    m: 1,
    border: 1,
    padding: '20px',
    overflow: 'auto',
  };

  // expanded state var
  const [expanded, setExpanded] = useState(false);
  // toggle bool
  // console.log('LINE 49 || ORDERCARD', user.roleId);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  console.log('LINE 29 || DIRECTIONS MODAL || popupInfo', popupInfo);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      // hideBackdrop={true}
      // disableScrollLock={true}
      disableAutoFocus={true}
      // keepMounted={true}
      BackdropProps={{}}
      sx={{ overflow: 'scroll' }}
    >
      <Box sx={style} className='texture2'>
        <IconButton
          onClick={handleClose}
          sx={{ position: 'absolute', top: '5%', right: '5%' }}
        >
          <CloseIcon />
        </IconButton>
        <Typography
          id='modal-modal-title'
          color='darkgreen'
          variant='h2'
          component='h2'
        >
          {popupInfo.waypoint_index === 0
            ? `Knock Knock Tomatoes Inc`
            : `Order #${popupInfo.waypoint_index}`}
        </Typography>
        <Typography
          id='modal-modal-description'
          sx={{ mt: 2 }}
          color='darkgreen'
        >
          {`${popupInfo.name}`}
        </Typography>
        <ExpandMore
          sx={{ color: 'green' }}
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ExpandMoreIcon />
        </ExpandMore>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <CardContent>
            {/* // setup map that returns a Typography */}
            {/* {user.roleId === 1 && <UpcomingOrderContentList order={order} />} */}
            <UpcomingOrderDirectionsList popupInfo={popupInfo} />
          </CardContent>
        </Collapse>
      </Box>
    </Modal>
  );
};

export default DirectionsModal;

//
//           <Popup
//             anchor={
//               Number(popupInfo.location[0]) > -90.1 &&
//               Number(popupInfo.location[0]) < -90.11
//                 ? 'top-left'
//                 : Number(popupInfo.location[0]) > -90.10436932015816
//                 ? 'top-left'
//                 : 'top-right'
//             }
//             longitude={Number(popupInfo.location[0])}
//             latitude={Number(popupInfo.location[1])}
//             onClose={() => setPopupInfo(null)}
//             style={{ background: 'transparent' }}
//           >
//             <Card
//               sx={{
//                 backgroundColor: '#e2f2d9',
//                 minWidth: '15rem',
//                 borderRadius: '1.2rem',
//                 boxShadow: 8,
//                 // elevation: 2,
//                 // boxShadow: 8,
//               }}
//               className='texture2'
//             >
//               <CardHeader
//                 avatar={
//                   // MAKE AVATAR A SEASON LOGO
//                   <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
//                     {`Delivery #${popupInfo.waypoint_index}`}
//                   </Avatar>
//                 }
//                 // subheader={`Planted on ${plant_date}`}
//                 // NEED TO FIGURE OUT HOW TO MATCH productS TO WEEKS
//                 title={`Delivery #${popupInfo.waypoint_index}`}
//               />
//               <CardMedia
//                 component='img'
//                 height='194'
//                 image='http://res.cloudinary.com/ddg1jsejq/image/upload/v1651189122/dpzvzkarpu8vjpwjsabd.jpg'
//               />
//               <CardContent>
//                 <Typography variant='body2' color='text.secondary'>
//                   {`On ${popupInfo.name}`}
//                 </Typography>
//               </CardContent>

//               <CardActions disableSpacing sx={{ justifyContent: 'center' }}>
//                 <Stack spacing={5} direction='row' id='product_card_stack'>
//                   <ExpandMore
//                     sx={{ color: 'green' }}
//                     expand={expanded}
//                     onClick={handleExpandClick}
//                     aria-expanded={expanded}
//                     aria-label='show more'
//                   >
//                     <ExpandMoreIcon />
//                   </ExpandMore>
//                 </Stack>
//               </CardActions>

//               <Collapse in={expanded} timeout='auto' unmountOnExit>
//                 <CardContent>
//                   {/* // setup map that returns all product info */}
//                   <Typography paragraph>
//                     {' '}
//                     {routeData.trips[0].legs[0].steps[0].maneuver.instruction}
//                   </Typography>
//                 </CardContent>
//               </Collapse>

//               {/* <div>product: {product.id}</div> */}
//             </Card>
//             {/* <div>
//               {`Delivery #${popupInfo.waypoint_index} at ${popupInfo.name}`} |{' '}
//             </div>
//             <img
//               width='100%'
//               src={`https://maps.googleapis.com/maps/api/streetview?size=400x400&location=47.5763831,-122.4211769
// &fov=80&heading=70&pitch=0&key=YOUR_API_KEY&signature=YOUR_SIGNATURE}`}
//             /> */}
//           </Popup>
