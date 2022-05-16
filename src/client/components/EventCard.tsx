/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useEffect, useContext } from "react";
import Event from "./Event";
import axios from "axios";
import { UserContext } from "./App";
import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

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
//import RSVPS from "./RSVPS";
const useStyles = makeStyles({
  gridContainer: {
    paddingTop: "150px",
    paddingLeft: "4rem",
    paddingRight: "4rem",
  },
});

const EventCard = ({
  handleEditClick,
  allEvents,
  updateCounter,
  inEditMode,
  getAllEvents,
  rsvps,
  rsvpCount,
  updateState,
}: AppProps) => {
  const user: { roleId: number; id: number } = useContext(UserContext);

  const classes = useStyles();
  return (
    <>
      {/* <div>
        <Typography variant="h3" fontWeight="600" align="center">
          Events for the Month of May
        </Typography>
      </div> */}

      <Grid
        container
        spacing={8}
        direction="row"
        alignItems="center"
        className={classes.gridContainer}
      >
        {Array.isArray(allEvents) &&
          allEvents.map((event: { id: number; eventName: string }) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={event.id}>
                <Event
                  event={event}
                  updateCounter={updateCounter}
                  handleEditClick={handleEditClick}
                  inEditMode={inEditMode}
                  getAllEvents={getAllEvents}
                  rsvps={rsvps}
                  rsvpCount={rsvpCount}
                  //updateState={updateState}
                />
              </Grid>
            );
          })}
      </Grid>
    </>
  );
};

export default EventCard;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
