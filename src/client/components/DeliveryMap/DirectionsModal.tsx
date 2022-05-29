// React Imports
import React, { useEffect, useState } from 'react';

// MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {
  Backdrop,
  CardContent,
  Chip,
  Collapse,
  Divider,
  Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Check from '@mui/icons-material/Check';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import UpcomingOrderDirectionsList from './UpcomingOrderDirectionsList';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';

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

// Styling theme control for mobile vs desktop
const Root = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  [theme.breakpoints.down('md')]: {
    position: 'bottom',
  },
}));

const DirectionsModal = ({
  lat,
  lon,
  open,
  handleClose,
  popupInfo,
  getTodaysOrders,
  updateCounter,
  setUpdateCounter,
}: any) => {
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
  const theme = useTheme();

  // expanded state var
  const [expanded, setExpanded] = useState(false);
  // index var to manage previous/next step display
  const [i, setI] = useState(0);
  // PAID STATE VAR
  // const [updateCounter, setUpdateCounter] = useState(0);
  const handleNextStep = () => {
    if (popupInfo.steps.length < 1) return;
    if (i < popupInfo.steps.length - 1) {
      setI(i + 1);
    } else {
      setI(0);
    }
  };
  const handlePreviousStep = () => {
    if (popupInfo.steps.length < 1) return;
    if (i > 0) {
      setI(i - 1);
    } else {
      setI(popupInfo.steps.length - 1);
    }
  };
  // Patch request to database to update paid status
  const handleUpdatePaidStatus = () => {
    handleClose();
    console.log('UPDATE ORDER PAID STATUS CLICKED', popupInfo.orderId);
    axios
      .patch(`/api/order/delivery_status/${popupInfo.orderId}`, {
        paid: !popupInfo.paid,
      })
      .then(() => {
        setUpdateCounter(updateCounter + 1);
        console.log('LINE 121 || ORDER PATCH || SUCCESS');
        // console.log('LINE 122', getTodaysOrders);
        // console.log('LINE 123', getTodaysOrders());
        // getTodaysOrders();
        // setUpdateCounter(updateCounter + 1);
      })
      .catch((err: any) => {
        console.error('LINE 111 || ORDER PATCH || ERROR', err);
      });
  };

  // toggle bool
  // console.log('LINE 49 || ORDERCARD', user.roleId);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  // console.log('LINE 29 || DIRECTIONS MODAL || popupInfo', popupInfo);

  // useEffect(() => {
  //   console.log('LINE 127 || DIRECTION MODAL USE EFFECT HIT');
  //   // getTodaysOrders();
  // }, [updateCounter]);
  return (
    <Root>
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
          {/* <Stack
            direction='row'
            justifyContent='space-between'
            alignContent='middle'
          > */}
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
          {!expanded && (
            <div>
              <Stack direction='row' justifyContent='space-between'>
                <Typography
                  id='modal-modal-description'
                  sx={{ mb: 2.2 }}
                  color='darkgreen'
                >
                  {`${popupInfo.name}`}
                </Typography>
                {popupInfo.i !== 0 && (
                  <Chip label='PAID' onClick={handleUpdatePaidStatus}></Chip>
                )}
                {popupInfo.i !== 0 && <Chip label='Delivered'></Chip>}
              </Stack>
              <Divider variant='middle' />
            </div>
          )}
          {/* <IconButton
            onClick={handleClose}
            sx={{ position: 'absolute', top: '5%', right: '5%' }}
          >
            <CloseIcon />
          </IconButton> */}
          {/* </Stack> */}
          <Stack direction='row' justifyContent='space-between'>
            {!expanded && (
              <Stack
                direction='row'
                justifyContent='space-between'
                alignContent='middle'
              >
                <IconButton
                  aria-label='previous'
                  onClick={
                    theme.direction === 'rtl'
                      ? handleNextStep
                      : handlePreviousStep
                  }
                >
                  {theme.direction === 'rtl' ? (
                    <SkipNextIcon color='success' />
                  ) : (
                    <SkipPreviousIcon color='success' />
                  )}
                </IconButton>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    pl: 1,
                    pb: 1,
                    verticalAlign: 'middle',
                  }}
                >
                  <Typography
                    id='modal-modal-description'
                    sx={{ mt: 0.5 }}
                    color='darkgreen'
                  >
                    {`${popupInfo.steps[i].maneuver.instruction}`}
                  </Typography>
                  {/* <IconButton aria-label='play/pause'>
              <PlayArrowIcon sx={{ height: 38, width: 38 }} color='success' />
            </IconButton> */}
                </Box>
              </Stack>
            )}
            {!expanded && (
              <Stack direction={'row'} alignContent={'right'}>
                <IconButton
                  aria-label='next'
                  onClick={
                    theme.direction === 'rtl'
                      ? handlePreviousStep
                      : handleNextStep
                  }
                >
                  {theme.direction === 'rtl' ? (
                    <SkipPreviousIcon color='success' />
                  ) : (
                    <SkipNextIcon color='success' />
                  )}
                </IconButton>
                <ExpandMore
                  sx={{ color: 'green' }}
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label='show more'
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </Stack>
            )}
          </Stack>
          <Collapse in={expanded} timeout='auto' unmountOnExit>
            <CardContent sx={{ justifyContent: 'right' }}>
              {/* // setup map that returns a Typography */}
              {/* {user.roleId === 1 && <UpcomingOrderContentList order={order} />} */}
              <UpcomingOrderDirectionsList popupInfo={popupInfo} />
              <Stack direction='row-reverse'>
                <ExpandMore
                  sx={{ color: 'green', alignSelf: 'right' }}
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label='show more'
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </Stack>
            </CardContent>
          </Collapse>
        </Box>
      </Modal>
    </Root>
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
