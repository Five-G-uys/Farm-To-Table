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
import EventDirections from './EventDirections';

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

const EventDirectionModal = ({
  lat,
  lon,
  open,
  handleClose,
  popupInfo,
  getEventRoutes,
  updateCounter,
  setUpdateCounter,
  event,
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
      })
      .catch((err: any) => {
        console.error('LINE 111 || ORDER PATCH || ERROR', err);
      });
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Root>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        disableAutoFocus={true}
        BackdropProps={{}}
        sx={{ overflow: 'scroll' }}
      >
        <Box sx={style} className='texture2'>
          <Typography
            id='modal-modal-title'
            color='darkgreen'
            variant='h2'
            component='h2'
          >
            {popupInfo.waypoint_index === 0
              ? `Knock Knock Tomatoes Inc`
              : `${event.eventName}${popupInfo.waypoint_index}`}
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
              </Stack>
              <Divider variant='middle' />
            </div>
          )}

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
              <EventDirections popupInfo={popupInfo} />
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

export default EventDirectionModal;
