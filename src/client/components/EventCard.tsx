import React, { useContext } from 'react';
import Event from './Event';
import { UserContext } from './App';
import { Box, Grid } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
//import GoogleCalendar from './GoogleCalendar';

interface AppProps {
  handleEditClick(id: number): void;
  allEvents: [];
  getAllEvents(): void;
  lat: string;
  lon: string;
  updateCoords(): void;
  mode: string;
}

//import RSVPS from "./RSVPS";
const useStyles = makeStyles({
  gridContainer: {
    paddingTop: '60px',
    justifyContent: 'center',
    paddingLeft: '5vw',
    paddingRight: '5vw',
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
}: AppProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user: { roleId: number; id: number } = useContext(UserContext);

  const classes = useStyles();
  return (
    <>
      {/* <Box>
        <GoogleCalendar />
      </Box> */}
      <Grid
        container
        spacing={8}
        direction='row'
        alignItems='center'
        className={classes.gridContainer}
      >
        {Array.isArray(allEvents) &&
          allEvents.map(
            (event: {
              id: number;
              eventName: string;
              description: string;
              thumbnail: string;
              location: string;
              eventType: string;
              eventDate: string;
            }) => {
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
