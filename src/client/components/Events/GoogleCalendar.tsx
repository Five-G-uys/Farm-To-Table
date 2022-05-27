import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { Grid } from '@mui/material';

const GoogleCalendar = () => {
  const handleDateClick = (e: DateClickArg) => {
    console.log('EVENT', e);
    if (e.jsEvent.altKey) {
      console.log('ALTCLICK');
      const title = prompt('ENTER DATE');
      const event = {
        title: title ? title : e.dateStr,
        start: e.date,
        allDay: true,
      };
    }
  };
  return (
    <Grid className='calendar-grid'>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        eventColor='success'
        dateClick={handleDateClick}
      />
    </Grid>
  );
};
export default GoogleCalendar;
