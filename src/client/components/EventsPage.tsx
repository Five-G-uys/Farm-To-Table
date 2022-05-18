import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './App';
// eslint-disable-next-line @typescript-eslint/no-var-requires
//mateiral UI
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {
  // amber,
  // blueGrey,
  // grey,
  // orange,
  purple,
  // deepPurple,
} from '@mui/material/colors';
//import Button from "@mui/material/Button";

//Component import
import EventCard from './EventCard';
//import RSVPS from "./RSVPS";

// can import getallproducts after migrating it to apicalls file
import { updatedEvent } from '../apiCalls/eventCalls';
import { CssBaseline, Container } from '@mui/material';

const EventsPage = () => {
  const user: { roleId: number; id: number } = useContext(UserContext);
  const { roleId } = user;

  const [updateCounter, setUpdateCounter] = useState(0);
  // cerate state var events array (set to result of get req)
  const [allEvents, setAllEvents] = useState([]);
  // create a stateful boolean to monitor if updating existing product (in update mode) or creating a new product entry
  const [inEditMode, setInEditMode] = useState(false);

  const [value, setValue] = React.useState('Farmers Market');
  const handleRadioBtn = (event: React.ChangeEvent<HTMLInputElement>) => {
    //event.preventDefault();
    setValue(event.target.value);
  };

  //event state variable;
  const [event, setEvent] = useState({
    id: 0,
    eventName: '',
    description: '',
    thumbnail: '',
    eventDate: '',
    eventType: '',
    location: '',
    // seasonTitle: "",
    // monthTitle: "",
  });
  //state that controls the form
  const [open, setOpen] = useState(false);

  // handle create form
  const handleCreateForm = () => {
    setOpen(true);
  };

  //to update state and cause a refresh?
  const updateState = () => {
    setUpdateCounter((updateCounter) => updateCounter + 1);
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
      // seasonTitle: "",
      // monthTitle: "",
    });
  };

  // Destructure product state obj
  const {
    eventName,
    description,
    thumbnail,
    eventDate,
    eventType,
    location,
    id,
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
          eventType: value,
          location: location,
          // monthTitle: monthTitle,
          // seasonTitle: seasonTitle,
        },
      })
      .then(({ data }) => {
        //console.log('LINE 107 saved!', data);
        setUpdateCounter((updateCounter) => updateCounter + 1);
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
          console.log('LINE 56', result.info.url);
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
        console.log('Rsvps get all Response ', data);
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
    const clickedEvent: {
      eventName: string | undefined;
      id: number | undefined;
      description: string | undefined;
      thumbnail: string | undefined;
      eventDate: number | undefined;
      eventType: string | undefined;
      location: string | undefined;
    } = allEvents.find(
      // find mutates original array values
      (event: { id: number }) => event.id === id,
    );
    clickedEvent.thumbnail = clickedEvent.thumbnail
      ? clickedEvent.thumbnail
      : 'http://res.cloudinary.com/ddg1jsejq/image/upload/v1651189122/dpzvzkarpu8vjpwjsabd.jpg';

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
      };
    });
    setInEditMode(true);
    setOpen(true);
  };

  useEffect((): void => {
    getAllEvents();
    getUserRsvps();
  }, [updateCounter]);

  //console.log("line 244 in EventsPage", event);

  return (
    <>
      <CssBaseline />
      {/* Hero unit */}
      <Box
        sx={{
          bgcolor: 'background.paper',
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
        inEditMode={inEditMode}
        updateState={updateState}
        rsvps={rsvps}
        //rsvpCount={rsvpCount}
        //updateState={updateState}
      />

      <div>
        {/* <Button onClick={handleToggle}>Show backdrop</Button> */}
        <Modal
          aria-labelledby='transition-modal-title'
          aria-describedby='transition-modal-description'
          sx={{
            color: purple,
            zIndex: (theme) => theme.zIndex.drawer + 1,
            //borderRadius: "2.5rem",
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
                    <form
                      onSubmit={
                        inEditMode ? handleEventUpdateSubmit : postEvent
                      }
                    >
                      --{' '}
                      <Button
                        variant='contained'
                        size='large'
                        onClick={showWidget}
                      >
                        Add Event Image
                      </Button>
                      <br></br>
                      {thumbnail && <img width={300} src={thumbnail} />}
                      <br></br>
                      <FormControl fullWidth sx={{ m: 1 }} variant='standard'>
                        <InputLabel htmlFor='standard-adornment-amount'>
                          Name of Event
                        </InputLabel>
                        <Input
                          name='eventName'
                          value={eventName}
                          id='Event Name'
                          // id='fullWidth'
                          placeholder='Name of Event'
                          onChange={handelTextInput}
                          startAdornment={
                            <InputAdornment position='start'></InputAdornment>
                          }
                        />
                      </FormControl>
                      <TextField
                        // width='75%'
                        // type={{ width: '75%' }}
                        id='filled-basic'
                        variant='filled'
                        // label='Filled'
                        value={description}
                        name='description'
                        label='Event Description'
                        // id='fullWidth'
                        placeholder='Event Description'
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
                        placeholder='Address for event'
                        onChange={handelTextInput}
                      />
                      <br></br>
                      <br></br>
                      <TextField
                        fullWidth
                        id='filled-basic'
                        variant='filled'
                        value={eventDate}
                        name='eventDate'
                        label='Event Date'
                        // id='fullWidth'
                        placeholder='05/29/2022'
                        onChange={handelTextInput}
                      />
                      {/* <br></br>
                      <br></br>
                      <TextField
                        fullWidth
                        id="filled-basic"
                        variant="filled"
                        value={monthTitle}
                        name="monthTitle"
                        label="Month of the events"
                        // id='fullWidth'
                        placeholder="Date of event"
                        onChange={handelTextInput}
                      />
                      <br></br>
                      <br></br>
                      <TextField
                        fullWidth
                        id="filled-basic"
                        variant="filled"
                        value={seasonTitle}
                        name="seasonTitle"
                        label="Season of the events"
                        // id='fullWidth'
                        placeholder="Season of events"
                        onChange={handelTextInput}
                      /> */}
                      <br></br>
                      <br></br>
                      {/* <Box> */}
                      <FormControl>
                        {' '}
                        <FormLabel id='eventType-for-event'>
                          Type of Event
                        </FormLabel>
                        <RadioGroup
                          aria-labelledby='eventType-for-event'
                          name='eventType'
                          // defaultValue="Farmers Market"
                          value={value}
                          onChange={handleRadioBtn}
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
                      {/* </Box> */}
                      <br></br>
                      <br></br>
                      <Button variant='contained' size='large' type='submit'>
                        {inEditMode ? 'UPDATE' : 'SAVE'}
                      </Button>
                    </form>
                  </Box>
                </div>
              </div>
            }
          </Fade>
        </Modal>
        {roleId > 3 && (
          <Fab
            onClick={handleCreateForm}
            size='small'
            // color='secondary'
            aria-label='add'
            style={{ transform: 'scale(2.5)', backgroundColor: '#80D55F' }}
            sx={{
              position: 'fixed',
              bottom: (theme) => theme.spacing(8),
              right: (theme) => theme.spacing(8),
            }}
          >
            <AddIcon style={{ color: '#FFFFFF' }} />
          </Fab>
        )}
      </div>
    </>
  );
};

export default EventsPage;
