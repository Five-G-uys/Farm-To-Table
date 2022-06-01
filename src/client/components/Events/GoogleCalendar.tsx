import React, { useState, useEffect, useContext } from 'react';
// import { Calendar } from '@fullcalendar/core';
import FullCalendar, { eventTupleToStore } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { Box, Grid } from '@mui/material';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import Modal from '@mui/material/Modal';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { UserContext } from '../App';
import swal from 'sweetalert';
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
  handleTrackCalendar(): void;
  rsvps: object[];
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  height: '90vh',
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
  handleTrackCalendar,
  rsvps,
}: AppProps) => {
  //run the page on load based on events
  useEffect(() => {}, [event, order, rsvps]);
  const user: { roleId: number; id: number } = useContext(UserContext);
  const { roleId, id } = user;
  //Events for the calendar
  const mappedEvents =
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

  //orders for the calendar
  // console.log('RSVPS', order);
  const mappedOrders = order.map((order: any) => {
    return {
      title: 'ORDER NUMBER: ' + order.id,
      date: order.delivery_date,
      allDay: false,
    };
  });

  //rsvps for user calendar
  const userEvents: { title: any; date: any }[] = [];
  const rsvpUser = () => {
    for (let i = 0; i < event.length; i++) {
      for (let k = 0; k < rsvps.length; k++) {
        if (event[i].id === rsvps[k].eventId) {
          userEvents.push({
            title: event[i].eventName,
            date: event[i].eventDate,
          });
        }
      }
    }
    return userEvents;
  };

  //will handles changes on a date click
  const handleDateClick = (e: DateClickArg) => {
    if (roleId > 3) {
      handleCalendarChange();
      handleEditClick(e.dateStr);
    } else {
      handleCalendarChange();
      swal({ title: 'Sorry, no permission to Edit!' });
      handleClose();
      handleCalendarChange();
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
        {/* //className='texture2' */}
        <Box sx={{ ...style, padding: '5vh' }} className='calendar'>
          <Button onClick={handleCalendarChange} variant='text' color='success'>
            <ExitToAppIcon />
          </Button>
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
            events={
              roleId > 3 ? [...mappedOrders, ...mappedEvents] : rsvpUser()
            }
            dateClick={(e: DateClickArg) => handleDateClick(e)}
          />
          <Button onClick={handleCalendarChange} variant='text' color='success'>
            <ExitToAppIcon />
          </Button>
        </Box>
      </Modal>
    </div>
  );
};
export default GoogleCalendar;
