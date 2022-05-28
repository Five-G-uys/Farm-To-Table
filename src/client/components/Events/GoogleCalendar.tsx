import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { Grid } from '@mui/material';

interface AppProps {
  event: any;
}

const GoogleCalendar = ({ event }: AppProps) => {
  console.log('LINE 12 GOOGLE MAPS', event);
  //makes the event grid clickable
  const [state, setState] = useState(event);
  useEffect(() => {
    // mapEvents(allEvents);
  }, [event]);
  const mapped =
    event &&
    event.map((event: any) => {
      return { id: event.id, title: event.eventName, date: event.eventDate };
    });

  // const mapEvents = () => {
  //   setState((state: any) => {
  //     return (
  //       state &&
  //       state.map((event: any) => {
  //         return {
  //           id: event.id,
  //           title: event.eventName,
  //           date: event.date,
  //         };
  //       })
  //     );
  //   });
  // };
  const handleDateClick = (e: DateClickArg) => {
    console.log('EVENT', e);
    if (e.jsEvent.altKey) {
      console.log('ALTCLICK');
      const title = prompt('ENTER DATE', e.date);
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
        initialView='dayGridMonth'
        weekends={true}
        events={[
          { title: 'event 1', date: '2022-05-27' },
          { title: 'event 2', date: '2022-06-06' },
        ]}
        eventColor='success'
        dateClick={handleDateClick}
      />
    </Grid>
  );
};
export default GoogleCalendar;
