import React, { useState, useEffect } from "react";
import Event from "./Event";
import axios from "axios";
//import RSVPS from "./RSVPS";

const EventCard = () => {
  const [events, setEvents] = useState({ eventArray: [] });
  const [counter, setCounter] = useState(0);
  const getAllEvents = () => {
    axios
      .get("/events/api/event")

      .then(({ data }) => {
        console.log("EVENT CARD COMPONENT SUCESSFULLY FECTHED DATA", data);
        setEvents((state) => {
          return {
            ...state,
            eventArray: data,
          };
        });
        setCounter((counter: number) => {
          if (counter === 20) {
            counter = 0;
          } else {
            counter + 1;
          }
          return counter;
        });
      })
      .catch((error) => {
        console.log("sorry, request failed", error);
      });
  };

  useEffect(() => {
    getAllEvents();
  }, [counter]);

  const { eventArray } = events;
  //console.log("line 28", eventArray);

  return (
    <div className="events">
      <nav className="nav">
        <h1 className="nav-event">Spring Season Events</h1>
      </nav>
      <h1 className="title-card">Events for this month</h1>
      <br></br>
      <br></br>
      <div className="card">
        {Array.isArray(eventArray) &&
          eventArray.map(
            (event: {
              eventName: string;
              description: string;
              thumbnail: React.ImgHTMLAttributes<string>;
              eventType: string;
              eventId: number;
              eventDate: string;
              id: number;
              location: string;
            }) => {
              const {
                eventName,
                eventType,
                thumbnail,
                description,
                eventDate,
                id,
                location,
              } = event;
              return (
                <Event
                  eventName={eventName}
                  eventType={eventType}
                  thumbnail={thumbnail}
                  description={description}
                  eventDate={eventDate}
                  getAllEvents={getAllEvents}
                  key={eventName}
                  eventId={id}
                  location={location}
                />
              );
            }
          )}
      </div>
      <footer className="footer"></footer>
    </div>
  );
};

export default EventCard;
