import React, { useState, useEffect } from 'react';
// import { Calendar } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import weekGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { Box, Grid } from '@mui/material';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

interface AppProps {
  event: any;
  open: boolean;
  handleCalendarChange(): void;
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  height: '80vh',
  backgroundColor: '#e2f2d9',
  border: '2px solid #000',
  borderRadius: '2.5rem',
  boxShadow: 24,
  overflow: 'auto',
  // margin: '15vw',
  // pt: 2,
  // px: 4,
  // pb: 3,
};

const GoogleCalendar = ({ event, open, handleCalendarChange }: AppProps) => {
  //run the page on load based on events
  useEffect(() => {}, [event]);
  const mapped =
    event &&
    event.map((event: any) => {
      return {
        id: event.id,
        title: event.eventName,
        date: event.eventDate,
        address: event.location,
        allDay: false,
      };
    });

  //will handles changes on a date click
  const handleDateClick = (e: DateClickArg) => {
    console.log('EVENT', e);
    if (e.jsEvent.altKey) {
      console.log('ALTCLICK');
    }
  };
  return (
    <div>
      <Modal
        sx={{ overflow: 'scroll' }}
        open={open}
        aria-labelledby='child-modal-title'
        aria-describedby='child-modal-description'
      >
        <Box sx={{ ...style, padding: '5vh' }} className='texture2'>
          <FullCalendar
            plugins={[
              dayGridPlugin,
              interactionPlugin,
              weekGridPlugin,
              googleCalendarPlugin,
              listPlugin,
            ]}
            initialView='dayGridMonth'
            weekends={true}
            events={mapped}
            dateClick={handleDateClick}
          />
          <Button onClick={handleCalendarChange} variant='text' color='success'>
            close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};
export default GoogleCalendar;
