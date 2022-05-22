// // // import Box from '@mui/material/Box';
// // // import Typography from '@mui/material/typography';
// // // import { Button } from '@mui/material';
// // // import React, {useEffect, useState }from "react"
// // // import { gapi } from 'gapi-script';

// /////////////////React Calendar//////////////////////////////

// import React from 'react';
// import ReactDOM from 'react-dom';

// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';

// import '@fullcalendar/core/main.css';
// import '@fullcalendar/daygrid/main.css';

// import '@fullcalendar/core/main.css';
// import '@fullcalendar/daygrid/main.css';

// class GoogleCalendar extends React.Component {
//   calendarComponentRef = React.createRef();
//   state = {
//     events: [
//       { id: 1, title: 'event 1', date: '2019-12-01' },
//       {
//         title: 'event 2',
//         start: '2019-12-01',
//         end: '2019-12-05',
//         allDay: true,
//         HostName: 'William',
//       },
//       {
//         title: 'event 3',
//         start: '2019-12-05',
//         end: '2019-12-07',
//         allDay: true,
//       },
//       {
//         title: 'event 4',
//         start: '2019-12-05',
//         end: '2019-12-07',
//         allDay: true,
//       },
//       {
//         title: 'event 5',
//         start: '2019-12-05',
//         end: '2019-12-07',
//         allDay: true,
//       },
//       {
//         title: 'event 6',
//         start: '2019-12-05',
//         end: '2019-12-07',
//         allDay: true,
//       },
//     ],
//   };

//   handleDateClick = (arg) => {
//     alert(arg.dateStr);
//   };

//   handleSelectedDates = (info) => {
//     alert('selected ' + info.startStr + ' to ' + info.endStr);
//     const title = prompt("What's the name of the title");
//     console.log(info);
//     if (title != null) {
//       const newEvent = {
//         title,
//         start: info.startStr,
//         end: info.endStr,
//       };
//       const data = [...this.state.events, newEvent];
//       this.setState({ events: data });
//       console.log('here', data);
//     } else {
//       console.log('nothing');
//     }
//   };

//   render() {
//     return (
//       <div>
//         <FullCalendar
//           schedulerLicenseKey='GPL-My-Project-Is-Open-Source'
//           ref={this.calendarComponentRef}
//           defaultView='dayGridMonth'
//           dateClick={this.handleDateClick}
//           displayEventTime={true}
//           header={{
//             left: 'prev,next today',
//             center: 'title',
//             right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
//           }}
//           selectable={true}
//           plugins={[
//             dayGridPlugin,
//             interactionPlugin,
//             timeGridPlugin,
//             resourceTimeGridPlugin,
//           ]}
//           eventClick={(event) => {
//             console.log(event.event._def.publicId);
//           }}
//           events={this.state.events}
//           select={this.handleSelectedDates}
//           eventLimit={3}
//         />
//       </div>
//     );
//   }
// }

// export default GoogleCalendar;

// ////////END REACT APP////////////////////////////////////////

// // // const GoogleCalendar = () => {

// // // const [showAuthButton, setShowAuthButton] =  useState(false);
// // // const [showSignOutButton, setShowSignOutButton] = useState(false);

// // //   const handleAuthClick = () => {
// // //     gapi.auth2.getAuthInstance().signIn();
// // //   }
// // //  const handleSignoutClick = () => {
// // //     gapi.auth2.getAuthInstance().signOut();
// // //   }

// // //   const initClient = () = {
// // //     gapi.client.init({
// // //       discoveryDocs: process.env.DISCOVERY_DOCS,
// // //       clientId: process.env.CLIENT_ID,
// // //       scope: process.env.SCOPES
// // //     }).then(function () {
// // //       console.log(window.gapi);
// // //       // Listen for sign-in state changes.

// // //       // ************* to access instance method you have to use `this.updateSigninStatus`
// // //   window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

// // //       // Handle the initial sign-in state.
// // //       updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

// // //       // **************this code is unnecessary and causes errors*****
// // //       // authorizeButton.onclick = handleAuthClick;
// // //       // signoutButton.onclick = handleSignoutClick;
// // //     });
// // //   }
// // //   const handleClientLoad = () => {
// // //     gapi.load('client:auth2', initClient);
// // //   }
// // //   const updateSigninStatus = (isSignedIn: any) => {
// // //     if (isSignedIn) {
// // //       setShowAuthButton(false)
// // //         setShowSignOutButton(true)
// // //       //listUpcomingEvents();
// // //       //insertNewEvent();
// // //     } else {
// // //       setShowAuthButton(true);
// // //       setShowSignOutButton(false);
// // //     }
// // //   }
// // //   useEffect (() => {
// // //     handleClientLoad();
// // //   },[])

// // //     let authButton = <button id="authorize-button" onClick={handleAuthClick}>Authorize</button>
// // //     let signOutButton = <button id="signout-button" onClick={handleSignoutClick}>Sign Out</button>
// // // return(
// // //       <div className="container">
// // //         {showAuthButton ? authButton : null}
// // //         {showSignOutButton ? signOutButton : null}
// // //       </div>)
// // // }
// // // export default GoogleCalendar;

// // import Box from '@mui/material/Box';
// // import Typography from '@mui/material/typography';
// // import { Button } from '@mui/material';
// // import React, { useEffect, useState } from 'react';
// // import { gapi } from 'gapi-script';
// // // interface GoogleCa {
// // //   apiKey: string;
// // //   clientID: string;
// // //   discoveryDocs: string[];
// // //   scope: string;
// // //   calendar: object;
// // // }

// // const GoogleCalendar = () => {
// //   const gapi = window.gapi;
// //   const API_KEY_GOOGLE_CALENDAR = process.env.API_KEY_GOOGLE_CALENDAR;
// //   const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
// //   // '510303832634-mmanne871qn6738i2ukrvl49jfs9nrio.apps.googleusercontent.com';
// //   const DISCOVERY_DOC =
// //     'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
// //   const SCOPES = 'https://www.googleapis.com/auth/calendar';

// //   const handleClick = () => {
// //     console.log(gapi);
// //     //console.log('line 16', gapi);

// //     gapi.load('client:oauth2', () => {
// //       console.log('LOaded client');
// //       gapi.client.init({
// //         apiKey: API_KEY_GOOGLE_CALENDAR,
// //         clientId: GOOGLE_CLIENT_ID,
// //         discoveryDocs: DISCOVERY_DOC,
// //         scope: SCOPES,
// //       });
// //       gapi.client.load('calendar', 'v3', () => console.log('bam!'));
// //       gapi.auth2
// //         .getAuthInstance()
// //         .signIn()
// //         .then(() => {
// //           const event = {
// //             summary: 'Google I/O 2015',
// //             location: '800 Howard St., San Francisco, CA 94103',
// //             description:
// //               "A chance to hear more about Google's developer products.",
// //             start: {
// //               dateTime: '2015-05-28T09:00:00-07:00',
// //               timeZone: 'America/Los_Angeles',
// //             },
// //             end: {
// //               dateTime: '2015-05-28T17:00:00-07:00',
// //               timeZone: 'America/Los_Angeles',
// //             },
// //             recurrence: ['RRULE:FREQ=DAILY;COUNT=2'],
// //             attendees: [
// //               { email: 'lpage@example.com' },
// //               { email: 'sbrin@example.com' },
// //             ],
// //             reminders: {
// //               useDefault: false,
// //               overrides: [
// //                 { method: 'email', minutes: 24 * 60 },
// //                 { method: 'popup', minutes: 10 },
// //               ],
// //             },
// //           };
// //           console.log('LINE 63', gapi.client);

// //           const request = gapi.client.calendar.events.insert({
// //             calendarId: 'primary',
// //             resource: event,
// //           });

// //           request.execute((event: { htmlLink: string | URL | undefined }) => {
// //             window.open(event.htmlLink);
// //           });
// //         })
// //         .catch((err) => {
// //           console.log('Failed to laod', err);
// //         });
// //     });
// //   };
// //   return (
// //     <Box>
// //       {/* <ButtonIcon> */}{' '}
// //       <Button onClick={handleClick}>Calendar will go here</Button>
// //       {/* </ButtonIcon> */}
// //     </Box>
// //   );
// // };
// // export default GoogleCalendar;
