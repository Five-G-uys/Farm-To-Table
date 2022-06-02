import React, { useContext } from 'react';
import Event from './Event';
import { UserContext } from '../App';
import { Box, Grid } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import GoogleCalendar from './GoogleCalendar';

interface AppProps {
  handleEditClick(id: number): void;
  allEvents: object[];
  getAllEvents(): void;
  lat: string;
  lon: string;
  updateCoords(): void;
  mode: string;
  getUserRsvps(): void;
  // handleUpdateState(): void;
}

//import RSVPS from "./RSVPS";
const useStyles = makeStyles({
  gridContainer: {
    paddingTop: '40px',
    paddingLeft: '4rem',
    paddingRight: '4rem',
    justifyContent: 'center',
  },
});

const EventCard = ({
  handleEditClick,
  allEvents,
  getAllEvents,
  lat,
  lon,
  updateCoords,
  mode,
  getUserRsvps,
}: // handleUpdateState,
AppProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user: { roleId: number; id: number } = useContext(UserContext);

  const classes = useStyles();
  return (
    <>
      <Grid
        container
        spacing={4}
        // direction='row'
        // alignItems='center'
        className={classes.gridContainer}
      >
        {Array.isArray(allEvents) &&
          allEvents.map(
            (
              event: any,
              //   {
              //   id: number;
              //   eventName: string;
              //   description: string;
              //   thumbnail: string;
              //   location: string;
              //   eventType: string;
              //   eventDate: string;
              // }
            ) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={event.id}>
                  <Event
                    event={event}
                    handleEditClick={handleEditClick}
                    getAllEvents={getAllEvents}
                    lat={lat}
                    lon={lon}
                    updateCoords={updateCoords}
                    mode={mode}
                    getUserRsvps={getUserRsvps}
                    // handleUpdateState={handleUpdateState}
                  />
                </Grid>
              );
            },
          )}
      </Grid>
    </>
  );
};

export default EventCard;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
