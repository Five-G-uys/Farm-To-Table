import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//mateiral UI
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Stack } from '@mui/material';
import { purple } from '@mui/material/colors';
//Component import
import EventCard from './EventCard';
import { updatedEvent } from './eventCalls';
import { CssBaseline, Container } from '@mui/material';

interface EventProps {
  id: number;
  eventName: string;
  description: string;
  thumbnail: string;
  eventDate: string;
  eventType: string;
  location: string;
  city: string;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface AppProps {
  handleEditClick(): void;
  allEvents: [];
  updateCounter: number;
  inEditMode: boolean;
  getAllEvents(): void;
  rsvps: [];
  rsvpCount: number;
  updateState(): void;
}

const EventsPage = ({ lat, lon, updateCoords, mode }: any) => {
  const user: { roleId: number; id: number } = useContext(UserContext);
  const { roleId } = user;

  const [updateCounter, setUpdateCounter] = useState(0);
  // cerate state var events array (set to result of get req)
  const [allEvents, setAllEvents] = useState<object[]>([]);
  // create a stateful boolean to monitor if updating
  //existing event (in update mode) or creating a new event
  const [inEditMode, setInEditMode] = useState(false);

  const [event, setEvent] = useState<EventProps>({
    id: 0,
    eventName: '',
    description: '',
    thumbnail: '',
    eventDate: '',
    eventType: 'Farmers marke',
    location: '',
    city: '',
  });
  //state that controls the form
  const [open, setOpen] = useState(false);

  // handle create form
  const handleCreateForm = () => {
    setOpen(true);
  };

  // Handlers for backdrop control
  const handleClose = () => {
    setOpen(false);
    setInEditMode(false);
    setEvent({
      id: 0,
      eventName: '',
      description: '',
      thumbnail: '',
      eventDate: '',
      eventType: '',
      location: '',
      city: '',
      // seasonTitle: "",
      // monthTitle: "",
    });
  };

  // Destructure event state obj
  const {
    eventName,
    description,
    thumbnail,
    eventDate,
    eventType,
    location,
    id,
    city,
    // monthTitle,
    // seasonTitle,
  } = event;

  const postEvent = (e: { preventDefault(): void }) => {
    //console.log("LINE 108");
    e.preventDefault();
    axios
      .post('/api/events', {
        event: {
          eventName: eventName,
          description: description,
          thumbnail: thumbnail,
          eventDate: eventDate,
          eventType: eventType,
          location: location,
          city: city,
          // monthTitle: monthTitle,
          // seasonTitle: seasonTitle,
        },
      })
      .then(({ data }) => {
        //console.log('LINE 107 saved!', data);
        setUpdateCounter((updateCounter) => updateCounter + 1);
        toast.success('Event Updated', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        handleClose();
      })
      .catch((err) => console.error(err));
  };

  // Box component styles
  const commonStyles = {
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    m: 1,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    border: 1,
    padding: '20px',
    borderRadius: '2.5rem',
    boxShadow: 3,
    minWidth: '500px',
    overflow: 'auto',
  };

  // create function to handle update form submission
  const handleEventUpdateSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    try {
      const result = await updatedEvent(event.id, event);
      // keep in try so it doesn't rerender on error
      setUpdateCounter(updateCounter + 1);
      handleClose();
    } catch (err) {
      console.error('LINE 164 || PRODUCTS PAGE ', err);
    }
  };

  const handelTextInput = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value, type, checked } = event.target;
    //console.log("NAME INSIDE OF HANDELTEXTINPUT", name, +" and " + value);
    setEvent((state) => {
      return {
        ...state,
        [name]: type === 'checkbox' ? checked : value,
      };
    });
    // console.log(event);
  };

  // Cloudinary handling
  const CLOUD_NAME = process.env.CLOUD_NAME;
  const CLOUD_PRESET2 = process.env.CLOUD_PRESET2;
  const showWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: CLOUD_NAME,
        uploadPreset: CLOUD_PRESET2,
        folder: name,
        // WE NEED TO CONSIDER ADDING A 2 DIGIT YEAR NUMBER AT THE END OF EACH SEASON TO IDENTIFY
        // AND ACCESS PHOTOS MORE EASILY
        tags: [id],
      },
      (
        error: { error: string },
        result: { event: string; info: { url: string } },
      ) => {
        if (!error && result && result.event === 'success') {
          // console.log('LINE 56', result.info.url);
          setEvent((state) => {
            return {
              ...state,
              thumbnail: result.info.url,
            };
          });
        }
        //console.log("LINE 135 || CLOUDINARY", error);
      },
    );
    widget.open();
  };

  const getAllEvents = () => {
    axios
      .get('/api/events')
      .then(({ data }) => {
        setAllEvents(data);
      })
      .catch((error) => {
        console.log('sorry, request failed', error);
      });
  };

  const [rsvps, setRsvps] = useState<string[]>([]);
  const getUserRsvps = () => {
    axios
      .get('/api/rsvps')
      .then(({ data }) => {
        // console.log('Rsvps get all Response ', data);
        setRsvps(data);
        //setRsvpCount(data.length);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  ////////////////Radio Button handle function///////////////////////////

  // handle click + edit form functionality for edit button in Product Card component
  const handleEditClick = (id: number | undefined) => {
    //handle searches for a clicked event in order to update
    const clickedEvent: any = allEvents.find(
      // find mutates original array values
      (event: any) => event.id === id,
    );
    clickedEvent.thumbnail = clickedEvent.thumbnail
      ? clickedEvent.thumbnail
      : 'http://res.cloudinary.com/ddg1jsejq/image/upload/v1651189122/dpzvzkarpu8vjpwjsabd.jpg';
    console.log('CLIECKED EVENT', clickedEvent);
    setEvent((state: any) => {
      return {
        ...state,
        id: id,
        eventName: clickedEvent.eventName,
        description: clickedEvent.description,
        thumbnail: clickedEvent.thumbnail,
        eventDate: clickedEvent.eventDate,
        eventType: clickedEvent.eventType,
        location: clickedEvent.location,
        city: clickedEvent.city,
      };
    });
    setInEditMode(true);
    setOpen(true);
  };

  useEffect((): void => {
    getAllEvents();
    getUserRsvps();
  }, [updateCounter]);
  // console.log('LINE 270', event.location, 'AND ', event);
  return (
    <>
      <CssBaseline />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Hero unit */}
      <Box
        sx={{
          backgroundColor: 'transparent',
          fontColor: 'primary',
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth='sm'>
          <Typography
            component='h1'
            variant='h2'
            align='center'
            color='text.primary'
            gutterBottom
            fontWeight={600}
          >
            Farm Events
          </Typography>
          <Typography
            variant='h5'
            align='center'
            color='text.secondary'
            paragraph
            marginBottom='12px'
          >
            We have regular Saturday farmer's markets and our seasonal Customer
            Appreciation Day is just around the corner. RSVP below and come join
            the fun!
          </Typography>
        </Container>
      </Box>
      <EventCard
        getAllEvents={getAllEvents}
        allEvents={allEvents}
        handleEditClick={handleEditClick}
        lat={lat}
        lon={lon}
        updateCoords={updateCoords}
        mode={mode}
      />

      <Box>
        {/* <Button onClick={handleToggle}>Show backdrop</Button> */}
        <Modal
          aria-labelledby='transition-modal-title'
          aria-describedby='transition-modal-description'
          sx={{
            color: purple,
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
              <Box
                sx={{
                  ...commonStyles,
                  maxHeight: '90vh',
                  flexWrap: 'wrap',
                  display: 'flex',
                  flexDirection: 'column',
                  // overflow: 'auto',
                  // overflowY: 'scroll',
                }}
              >
                <form
                  onSubmit={inEditMode ? handleEventUpdateSubmit : postEvent}
                >
                  {thumbnail && <img width={300} src={thumbnail} />}
                  <Box>
                    <FormControl fullWidth sx={{ m: 1 }} variant='standard'>
                      {' '}
                      <FormLabel id='demo-radio-buttons-group-label'>
                        <h3 className='create-subscription'>Create Event</h3>
                      </FormLabel>
                    </FormControl>
                  </Box>
                  {/* <FormControl fullWidth sx={{ m: 1 }} variant='standard'>
                        <InputLabel htmlFor='standard-adornment-amount'>
                          Name of Event
                        </InputLabel> */}
                  <TextField
                    variant='filled'
                    fullWidth
                    name='eventName'
                    value={eventName}
                    label='Event Name'
                    id='Event Name'
                    placeholder='Ex: 1st Annual Spring Time Festival'
                    onChange={handelTextInput}
                    // startAdornment={
                    //   <InputAdornment position='start'></InputAdornment>
                    // }
                  />
                  {/* </FormControl> */}
                  <br></br>
                  <br></br>
                  <TextField
                    // width='75%'
                    // type={{ width: '75%' }}
                    id='filled-basic'
                    variant='filled'
                    fullWidth
                    value={description}
                    name='description'
                    label='Description'
                    placeholder='Ex: An afternoon outdoor market where the community is welcomed to come and sample all our farm has to offer!'
                    onChange={handelTextInput}
                  />
                  <br></br>
                  <br></br>
                  <TextField
                    fullWidth
                    id='filled-basic'
                    variant='filled'
                    value={location}
                    name='location'
                    label='Address'
                    // id='fullWidth'
                    placeholder='Ex: 123 Wholesome Ln. '
                    onChange={handelTextInput}
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
                    placeholder='Ex: Pleasantville'
                    onChange={handelTextInput}
                  />
                  <br></br>
                  <br></br>
                  <TextField
                    type='datetime-local'
                    fullWidth
                    id='filled-basic'
                    variant='filled'
                    value={eventDate}
                    name='eventDate'
                    onChange={handelTextInput}
                  />
                  <br></br>
                  <br></br>
                  <Box>
                    <FormControl>
                      {' '}
                      <FormLabel id='eventType-for-event'>
                        Type of Event
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby='eventType-for-event'
                        name='eventType'
                        defaultValue='Farmers Market'
                        value={eventType}
                        onChange={handelTextInput}
                      >
                        <FormControlLabel
                          control={<Radio color={'success'} />}
                          value='Farmers Market'
                          label='Farmers Market'
                        />
                        <FormControlLabel
                          control={<Radio color='success' />}
                          value='Community Volunteering'
                          label='Community Volunteering'
                        />
                        <FormControlLabel
                          control={<Radio color='success' />}
                          value='Customer Day'
                          label='Customer Day'
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                  <br></br>
                  <br></br>
                  <Stack direction='row' justifyContent='space-between'>
                    <Button
                      variant='text'
                      size='large'
                      onClick={showWidget}
                      sx={{ color: 'green' }}
                    >
                      Add Event Image
                    </Button>
                    <Button
                      variant='text'
                      size='large'
                      color='success'
                      type='submit'
                      sx={{ color: 'green' }}
                    >
                      {inEditMode ? 'UPDATE' : 'SAVE'}
                    </Button>
                  </Stack>
                </form>
              </Box>
            }
          </Fade>
        </Modal>
        {roleId > 3 && (
          <Fab
            onClick={handleCreateForm}
            size='large'
            // color='secondary'
            aria-label='add'
            style={{ transform: 'scale(1.5)', backgroundColor: '#e2f2d9' }}
            sx={{
              position: 'fixed',
              bottom: (theme) => theme.spacing(8),
              right: (theme) => theme.spacing(8),
            }}
            className='texture2'
          >
            <AddIcon style={{ color: 'text.primary' }} />
          </Fab>
        )}
      </Box>
    </>
  );
};

export default EventsPage;
