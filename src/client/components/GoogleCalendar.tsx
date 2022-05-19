import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/typography';
import { Button } from '@mui/material';
import gapi from 'gapi-script';
interface GoogleCa {
  apiKey: string;
  clientID: string;
  discoveryDocs: string[];
  scope: string;
}

const GoogleCalendar = () => {
  const handleClick = () => {
    const gapi = window.gapi;
    const API_KEY_GOOGLE_CALENDAR = process.env.API_KEY_GOOGLE_CALENDAR;
    const GOOGLE_CLIENT_ID_CALENDAR =
      '510303832634-mmanne871qn6738i2ukrvl49jfs9nrio.apps.googleusercontent.com';
    const DISCOVERY_DOC =
      'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
    const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

    gapi.load('client:auth2', () => {
      console.log('LOaded client');
      gapi.client.init({
        apiKey: API_KEY_GOOGLE_CALENDAR,
        clientId: GOOGLE_CLIENT_ID_CALENDAR,
        discoveryDocs: DISCOVERY_DOC,
        scope: SCOPES,
      });
      gapi.client.load('calendar', 'v3', () => console.log('bam!'));
      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then((data) => {
          console.log('data from google calendar login', data);
        })
        .catch((err) => {
          console.log('Failed to laod', err);
        });
    });
  };

  return (
    <Box>
      {/* <ButtonIcon> */}{' '}
      <Button onClick={handleClick}>Calendar will go here</Button>
      {/* </ButtonIcon> */}
    </Box>
  );
};
export default GoogleCalendar;
