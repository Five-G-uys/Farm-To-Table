/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "./App";
// eslint-disable-next-line @typescript-eslint/no-var-requires
import { ThemeProvider, createTheme } from "@mui/system";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Navigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";
import {
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
} from "@material-ui/core";

// Component Imports
import ProductsContainer from "./ProductsContainer";
// can import getallproducts after migrating it to apicalls file
import { updateProduct } from "../apiCalls/productCallS";
import { cli } from "webpack";

const EventsPage = () => {
  const user: any = useContext(UserContext);
  console.log("THIS IS WORKING", user);

  const [updateCounter, setUpdateCounter] = useState(0);
  // cerate state var Products array (set to result of get req)
  const [dbEvents, setDBEvents] = useState([]);
  // create a stateful boolean to monitor if updating existing product (in update mode) or creating a new product entry
  const [inEditMode, setInEditMode] = useState(false);

  const [event, setEvent] = useState({
    eventId: 0,
    eventName: "",
    description: "",
    thumbnail: "",
    category: "",
    eventDate: "",
    eventType: "",
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
      eventId: 0,
      eventName: "",
      description: "",
      thumbnail: "",
      category: "",
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
    eventId,
  } = event;

  const postProduct = (e: any) => {
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
        console.log("saved!", data);
        setUpdateCounter(updateCounter + 1);
        handleClose();
        // <Navigate to='/admin/edit-products' />; // ???
      })
      .catch((err) => console.error(err));
  };

  // Box component styles
  const commonStyles = {
    bgcolor: "background.paper",
    borderColor: "text.primary",
    m: 1,
    // to center elements absolutely inside parent
    // add event listener to window size to resize only when certain size bounds are crossed
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
      const result = await updateProduct(event.id, event);
      // keep in try so it doesn't rerender on error
      setUpdateCounter(updateCounter + 1);
      handleClose();

      console.log("LINE 130 || PRODUCTS PAGE", result);
    } catch (err) {
      console.error("LINE 132 || PRODUCTS PAGE ", err);
    }
  };

  const handelTextInput = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = event.target;
    setEvent((state) => {
      return {
        ...state,
        [name]: type === "checkbox" ? checked : value,
      };
    });
    // console.log(event);
  };

  ///////////////////////////////////////////////// CONSOLIDATE ALL CLOUDINARY HANDLING
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
        tags: [eventId],
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
        setEvent((state) => {
          return {
            ...state,
            eventArray: data,
          };
        });
      })
      .catch((error) => {
        console.log("sorry, request failed", error);
      });
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  // handle click + edit form functionality for edit button in Product Card component
  const handleEditClick = (idEvent: any) => {
    console.log("LINE 185 || PRODUCTS PAGE CLICKED", idEvent);

    const clickedEvent: any = dbEvents.find(
      // find mutates original array values
      (event: any) => event.id === eventId
    );
    clickedEvent.thumbnail = clickedEvent.thumbnail
      ? clickedEvent.thumbnail
      : "http://res.cloudinary.com/ddg1jsejq/image/upload/v1651189122/dpzvzkarpu8vjpwjsabd.jpg";
    // delete clickedProduct.updatedAt;
    // delete clickedProduct.createdAt;
    // delete clickedProduct.id;

    setEvent((state) => {
      return {
        ...state,
        eventId: idEvent,
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
  }, [updateCounter]);

  return (
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
                      inEditMode ? handleEventUpdateSubmit : postProduct
                    }
                  >
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
                    {/* <fieldset>
                      <legend className="radio-title">Type of event</legend>
                      <input
                        type="radio"
                        id="Farmers Market"
                        name="eventType"
                        value={"Farmers Market"}
                        checked={eventType === "Farmers Market"}
                        onChange={handelTextInput}
                      />
                      <label htmlFor="Farmers Market">Farmers Market</label>
                      <br />
                      <input
                        type="radio"
                        id="Customer Day"
                        name="eventType"
                        value="Customer Day"
                        checked={eventType === "Customer Day"}
                        onChange={handelTextInput}
                      />
                      <label htmlFor="customerDay">Customer Day</label>
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
                      <br />
                    </fieldset> */}
                    {/* <FormControl>
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
                    </FormControl> */}
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
                    </fieldset>
                    <br></br>
                    <br></br>
                    <Button variant="contained" size="large" type="submit">
                      {inEditMode ? "UPDATE" : "SAVE"}
                    </Button>
                    <br></br>
                    <br></br>
                    {/* <button type='submit' className='form--submit'>
                  Save Product
                </button> */}
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
  );
};

export default EventsPage;
