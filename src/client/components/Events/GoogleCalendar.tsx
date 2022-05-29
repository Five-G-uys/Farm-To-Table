import React, { useState, useEffect } from 'react';
// import { Calendar } from '@fullcalendar/core';
import FullCalendar, { eventTupleToStore } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { Box, Grid } from '@mui/material';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

interface AppProps {
  event: any;
  open: boolean;
  handleCalendarChange(): void;
  inEditMode: boolean;
  handleClose(): void;
  handleInEditMode(): void;
  handleEditClick(id: number): void;
  getOrders(): void;
  order: [];
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

const GoogleCalendar = ({
  event,
  open,
  handleCalendarChange,
  handleClose,
  handleInEditMode,
  inEditMode,
  handleEditClick,
  getOrders,
  order,
}: AppProps) => {
  //run the page on load based on events
  useEffect(() => {}, [event, order]);
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

  const mappedOrders = order.map((order: any) => {
    return {
      title: 'ORDER NUMBER: ' + order.id,
      date: order.delivery_date,
      allDay: false,
    };
  });
  //will handles changes on a date click
  const handleDateClick = (e: DateClickArg) => {
    // console.log('DATECLICK', typeof e);
    // console.log('EVENT', e);
    // if (e.jsEvent.altKey) {
    //   event.forEach(
    //     (event: {
    //       id: number;
    //       title: string;
    //       date: string;
    //       address: string;
    //     }) => {
    //       console.log('CALENDAR EVENT', mapped['event'].id);
    //       if (event.id === mapped['event'].id) {
    //         handleEditClick(event.id);
    //       }
    //     },
    //   );
    // }
    return (
      <div>
        <Modal
          sx={{ overflow: 'scroll' }}
          open={open}
          aria-labelledby='child-modal-title'
          aria-describedby='child-modal-description'
        ></Modal>
      </div>
    );
  };
  return (
    <div>
      <Modal
        sx={{ overflow: 'scroll' }}
        open={open}
        aria-labelledby='child-modal-title'
        aria-describedby='child-modal-description'
      >
        {/* //className='texture2' */}
        <Box sx={{ ...style, padding: '5vh' }} className='calendar'>
          <FullCalendar
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            plugins={[
              dayGridPlugin,
              interactionPlugin,
              googleCalendarPlugin,
              timeGridPlugin,
            ]}
            initialView='dayGridMonth'
            weekends={true}
            events={[...mappedOrders, ...mapped]}
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
