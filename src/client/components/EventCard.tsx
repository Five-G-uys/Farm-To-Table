/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useEffect, useContext } from "react";
import Event from "./Event";
import axios from "axios";
import { UserContext } from "./App";
import { Grid } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

//import RSVPS from "./RSVPS";
const useStyles = makeStyles({
  gridContainer: {
    paddingTop: "40px",
    paddingLeft: "4rem",
    paddingRight: "4rem",
  },
});

const EventCard = ({
  handleEditClick,
  allEvents,
  updateCounter,
  inEditMode,
  updateState,
  getAllEvents,
}: any) => {
  const user: any = useContext(UserContext);
  const { id, roleId } = user;
  const [rsvps, setRsvps] = useState([]);
  const getAllRSVPSEvents = () => {
    axios
      .get(`/events/api/user/rsvps/${id}`)
      .then(({ data }) => {
        console.log("LINE 33 FrontEND request", data);
        const newArr = data
          .map((eventObj: any) => {
            return eventObj.value;
          })
          .map((eventArr: any) => {
            return eventArr[0];
          });
        setRsvps(newArr);
        //setRsvpsCount(newArr.length);
      })
      .catch((err) => {
        console.log("LINE 48 FAILED", err);
      });
  };

  // console.log("LINE 75 ", rsvps + "and number");

  // console.log("LINE 45", rsvps);
  // useEffect(() => {
  //   getAllRSVPSEvents();
  // }, []);

  //console.log("line 32", allEvents);
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={12}
      className={classes.gridContainer}
      // justify='center'
    >
      {Array.isArray(allEvents) &&
        allEvents.map((event: any) => {
          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={3}
              key={event.eventName + event.id}
            >
              <Event
                event={event}
                updateCounter={updateCounter}
                handleEditClick={handleEditClick}
                inEditMode={inEditMode}
                updateState={updateState}
                getAllEvents={getAllEvents}
                rsvps={rsvps}
              />
            </Grid>
          );
        })}
    </Grid>
  );
};

export default EventCard;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
