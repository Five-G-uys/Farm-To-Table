/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import RSVPLIST from './RSVPLIST';
import { UserContext } from './App';
import { Grid, Container, Paper, CardActions, Box } from '@mui/material';

const RSVPS = () => {
  const user: { roleId: number; id: number } = useContext(UserContext);
  const { roleId, id } = user;

  const [rsvps, setRsvps] = useState([]);
  const [rsvpsCount, setRsvpsCount] = useState(0);

  const getAllRSVPSEvents = () => {
    axios
      .get(`/api/rsvps/user-id/${id}`)
      .then(({ data }) => {
        const newArr = data
          .map((eventObj: any) => {
            return eventObj.value;
          })
          .map((eventArr: any) => {
            return eventArr[0];
          });
        setRsvps(newArr);
        setRsvpsCount(newArr.length);
      })
      .catch((err) => {
        console.log('LINE 48 FAILED', err);
      });
  };

  useEffect(() => {
    getAllRSVPSEvents();
  }, []);

  return (
    <CardActions>
      <Grid>
        <Container background-color='success'>
          <Paper>
            <Box>
              {roleId < 4 &&
                rsvps.length > 0 &&
                rsvps.map(
                  (event: {
                    eventName: string;
                    description: string;
                    thumbnail: React.ImgHTMLAttributes<string>;
                    eventType: string;
                    eventDate: string;
                    id: number;
                    location: string;
                  }) => {
                    const {
                      eventName,
                      eventDate,
                      eventType,
                      description,
                      id,
                      thumbnail,
                      location,
                    } = event;
                    return (
                      <>
                        <RSVPLIST
                          eventName={eventName}
                          eventType={eventType}
                          thumbnail={thumbnail}
                          description={description}
                          eventDate={eventDate}
                          eventId={id}
                          key={description}
                          location={location}
                          getAllRSVPSEvents={getAllRSVPSEvents}
                        />
                      </>
                    );
                  },
                )}
            </Box>
          </Paper>
        </Container>
      </Grid>
    </CardActions>
  );
};

export default RSVPS;
