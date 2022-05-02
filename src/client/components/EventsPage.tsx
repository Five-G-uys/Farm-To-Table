/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "./App";
// eslint-disable-next-line @typescript-eslint/no-var-requires
//mateiral UI
import { ThemeProvider, createTheme } from "@mui/system";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Navigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
//import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

import Fade from "@mui/material/Fade";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

//Component import
import EventCard from "./EventCard";

// Component Imports
import ProductsContainer from "./ProductsContainer";
// can import getallproducts after migrating it to apicalls file
import { updatedEvent } from "../apiCalls/eventCalls";
import { cli } from "webpack";

const EventsPage = () => {
  const user: any = useContext(UserContext);
  console.log("THIS IS WORKING", user);

  const [updateCounter, setUpdateCounter] = useState(0);
  // cerate state var Products array (set to result of get req)
  const [allEvents, setAllEvents] = useState([]);
  // create a stateful boolean to monitor if updating existing product (in update mode) or creating a new product entry
  const [inEditMode, setInEditMode] = useState(false);

  const [value, setValue] = React.useState("Farmers Market");
  console.log("LINE 265 VALUE", value);
  const handleRadioBtn = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("LINE 267 VALUE", value);
    setValue(event.target.value);
  };

  const [event, setEvent] = useState({
    id: 0,
    eventName: "",
    description: "",
    thumbnail: "",
    eventDate: "",
    eventType: value,
    location: "",
  });

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
      eventName: "",
      description: "",
      thumbnail: "",
      eventDate: "",
      eventType: "",
      location: "",
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
  } = event;

  const postEvent = (e: any) => {
    console.log("LINE 108");
    e.preventDefault();
    axios
      .post("/events/api/event", {
        event: {
          eventName: eventName,
          description: description,
          thumbnail: thumbnail,
          eventDate: eventDate,
          eventType: eventType,
          location: location,
        },
      })
      .then((data) => {
        console.log("LINE 107 saved!", data);
        setUpdateCounter(updateCounter + 1);
        handleClose();
        // <Navigate to='/admin/edit-products' />; // ???
      })
      .catch((err) => console.error(err));
  };

  //delete request for deleteting an event in the database
  const deleteEvent = () => {
    console.log("LINE 81", user.id, " and ", id);
    axios
      .delete("/events/api/event/delete", {
        params: { id: id },
      })
      .then((data) => {
        console.log("87 LINE ", data);
        getAllEvents();
      })
      .catch((err) => {
        console.error("91 REQUEST FAILED", err);
      });
  };

  // Box component styles
  const commonStyles = {
    bgcolor: "background.paper",
    borderColor: "text.primary",
    m: 1,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: 1,
    padding: "20px",
    borderRadius: "2.5rem",
    boxShadow: 24,
  };

  // create function to handle update form submission
  const handleEventUpdateSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const result = await updatedEvent(event.id, event);
      // keep in try so it doesn't rerender on error
      setUpdateCounter(updateCounter + 1);
      handleClose();

      console.log("LINE 162 || PRODUCTS PAGE", result);
    } catch (err) {
      console.error("LINE 164 || PRODUCTS PAGE ", err);
    }
  };

  const handelTextInput = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = event.target;
    console.log("NAME INSIDE OF HANDELTEXTINPUT", name, +" and " + value);
    setEvent((state) => {
      return {
        ...state,
        [name]: type === "checkbox" ? checked : value,
      };
    });
    // console.log(event);
  };

  // Cloudinary handling
  // console.log(process.env.CLOUD_PRESET2);
  const CLOUD_NAME = process.env.CLOUD_NAME;
  const CLOUD_PRESET2 = process.env.CLOUD_PRESET2;
  const showWidget = () => {
    console.log("LINE 115 || CLOUDINARY");
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: CLOUD_NAME,
        uploadPreset: CLOUD_PRESET2,
        folder: name,
        // WE NEED TO CONSIDER ADDING A 2 DIGIT YEAR NUMBER AT THE END OF EACH SEASON TO IDENTIFY
        // AND ACCESS PHOTOS MORE EASILY
        tags: [id],
      },
      (error: any, result: { event: string; info: { url: string } }) => {
        if (!error && result && result.event === "success") {
          console.log("LINE 56", result.info.url);
          setEvent((state) => {
            return {
              ...state,
              thumbnail: result.info.url,
            };
          });
          console.log("LINE 63", result.info.url);
        }
        console.log("LINE 135 || CLOUDINARY", error);
      }
    );
    widget.open();
  };

  const getAllEvents = () => {
    axios
      .get("/events/api/event")

      .then(({ data }) => {
        console.log("EVENT CARD COMPONENT SUCESSFULLY FECTHED DATA", data);
        setAllEvents(data);
      })
      .catch((error) => {
        console.log("sorry, request failed", error);
      });
  };

  ////////////////Radio Button handle function///////////////////////////

  // handle click + edit form functionality for edit button in Product Card component
  const handleEditClick = (id: any) => {
    //console.log("LINE 185 || PRODUCTS PAGE CLICKED", id);

    const clickedEvent: any = allEvents.find(
      // find mutates original array values
      (event: any) => event.id === id
    );
    clickedEvent.thumbnail = clickedEvent.thumbnail
      ? clickedEvent.thumbnail
      : "http://res.cloudinary.com/ddg1jsejq/image/upload/v1651189122/dpzvzkarpu8vjpwjsabd.jpg";

    setEvent((state) => {
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
    // deleteEvent();
  }, [updateCounter]);

  console.log("line 244 in EventsPage", event);

  return (
    <>
      <EventCard
        getAllEvents={getAllEvents}
        allEvents={allEvents}
        updateCounter={updateCounter}
        handleEditClick={handleEditClick}
        deleteEvent={deleteEvent}
        inEditMode={inEditMode}
      />
      <div>
        {/* <Button onClick={handleToggle}>Show backdrop</Button> */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
            borderRadius: "2.5rem",
            boxShadow: 24,
          }}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 750,
          }}
          className="add_x_form_modal"
        >
          <Fade in={open}>
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
                      --{" "}
                      <Button
                        variant="contained"
                        size="large"
                        onClick={showWidget}
                      >
                        Add Event Image
                      </Button>
                      <br></br>
                      {thumbnail && <img width={300} src={thumbnail} />}
                      <br></br>
                      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-amount">
                          Name of Event
                        </InputLabel>
                        <Input
                          name="eventName"
                          value={eventName}
                          id="Event Name"
                          // id='fullWidth'
                          placeholder="Name of Event"
                          onChange={handelTextInput}
                          startAdornment={
                            <InputAdornment position="start"></InputAdornment>
                          }
                        />
                      </FormControl>
                      <TextField
                        // width='75%'
                        // type={{ width: '75%' }}
                        id="filled-basic"
                        variant="filled"
                        // label='Filled'
                        value={description}
                        name="description"
                        label="Event Description"
                        // id='fullWidth'
                        placeholder="Event Description"
                        onChange={handelTextInput}
                      />
                      <br></br>
                      <br></br>
                      <TextField
                        fullWidth
                        id="filled-basic"
                        variant="filled"
                        value={location}
                        name="location"
                        label="location"
                        // id='fullWidth'
                        placeholder="location of event"
                        onChange={handelTextInput}
                      />
                      <br></br>
                      <br></br>
                      <TextField
                        fullWidth
                        id="filled-basic"
                        variant="filled"
                        value={eventDate}
                        name="eventDate"
                        label="Event Date"
                        // id='fullWidth'
                        placeholder="Date of event"
                        onChange={handelTextInput}
                      />
                      <br></br>
                      <br></br>
                      <Box>
                        <FormControl>
                          <FormLabel id="demo-controlled-radio-buttons-group">
                            Event Type
                          </FormLabel>
                          <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={value}
                            // onChange={handelTextInput}
                            onChange={handleRadioBtn}
                          >
                            <FormControlLabel
                              control={<Radio />}
                              label="Farmers Market"
                              value="Customers Day"
                              // variant="filled"
                            />
                            <FormControlLabel
                              control={<Radio size="small" />}
                              value="Customers Day"
                              label="Customers Day"
                              // variant="filled"
                            />
                            <FormControlLabel
                              control={<Radio />}
                              value="Community Volunteering"
                              label="Community Volunteering"
                              // variant="filled"
                            />
                          </RadioGroup>
                        </FormControl>
                      </Box>
                      {/* <fieldset>
                        <legend className="radio-title">Type of event</legend>
                        <input
                          type="radio"
                          id="Farmers Market"
                          name="eventType"
                          value={value}
                          checked={eventType === "Farmers Market"}
                          onChange={handelTextInput}
                        />
                        <label htmlFor="Farmers Market">Farmers Market</label>
                        <br />
                        <input
                          type="radio"
                          id="Customer Day"
                          name="eventType"
                          value="Customers Day"
                          checked={eventType === "Customers Day"}
                          onChange={handelTextInput}
                        />
                        <label htmlFor="Customers Day">Customer Day</label>
                        <br />

                        <input
                          type="radio"
                          id="Community Volunteering"
                          name="eventType"
                          value="Community Volunteering"
                          checked={eventType === "Community Volunteering"}
                          onChange={handelTextInput}
                        />
                        <label htmlFor="Farmers-Market">
                          Community volunteering
                        </label>
                      </fieldset> */}
                      {/* </fieldset> 
                       <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label">
                        Type of Event
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="Farmers market"
                        name="radio-buttons-group"
                      >
                        <FormControlLabel
                          value="Customer Day"
                          control={eventType}
                          label="Customer Day"
                          onChange={handelTextInput}
                        />
                        <FormControlLabel
                          value="Farmers Market"
                          control={eventType}
                          label="Farmers-Market"
                          onChange={handelTextInput}
                        />
                        <FormControlLabel
                          value="Community volunteering"
                          control={eventType}
                          label="Other"
                          onChange={handelTextInput}
                        />
                      </RadioGroup>
                    </FormControl> 
                      <fieldset>
                        <FormControlLabel
                          value="Customer Day"
                          control={<Radio disabled={handelTextInput} />}
                          label="Customer Day"
                          disabled={handelTextInput}
                        />
                        <FormControlLabel
                          value="Farmers-Market"
                          control={<Radio disabled={handelTextInput} />}
                          label="Farmers-Market"
                          disabled={handelTextInput}
                        />
                        <FormControlLabel
                          value="none"
                          control={<Radio disabled={handelTextInput} />}
                          label="Community volunteering"
                          disabled
                        />
                      </fieldset> */}
                      <br></br>
                      <br></br>
                      <Button variant="contained" size="large" type="submit">
                        {inEditMode ? "UPDATE" : "SAVE"}
                      </Button>
                    </form>
                  </Box>
                </div>
              </div>
            }
          </Fade>
        </Modal>
        <Fab
          onClick={handleCreateForm}
          size="small"
          // color='secondary'
          aria-label="add"
          style={{ transform: "scale(2.5)", backgroundColor: "#80D55F" }}
          sx={{
            position: "fixed",
            bottom: (theme) => theme.spacing(8),
            right: (theme) => theme.spacing(8),
          }}
        >
          <AddIcon style={{ color: "#FFFFFF" }} />
        </Fab>
      </div>
    </>
  );
};

export default EventsPage;
function updateEvent(
  id: number,
  event: {
    id: number;
    eventName: string;
    description: string;
    thumbnail: string;
    eventDate: string;
    eventType: string;
    location: string;
  }
) {
  throw new Error("Function not implemented.");
}
