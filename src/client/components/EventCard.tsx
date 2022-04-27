import React, { useState, useEffect } from "react";
import Event from "./Event";
import axios from "axios";
//import RSVPS from "./RSVPS";

const EventCard = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [events, setEvents] = useState({ eventArray: {} });

  const getAllEvents = () => {
    axios
      .get("/events")
      .then((data) => {
        //console.log("SUCESSFULLY FECTHED DATA", data.data);
        setEvents((state) => {
          return {
            ...state,
            eventArray: [...data.data],
          };
        });
      })
      .catch((error) => {
        console.log("sorry, request failed", error);
      });
  };
  useEffect(() => {
    getAllEvents();
  }, []);

  const { eventArray } = events;
  // console.log("line 28", eventArray);

  return (
    <div className="events">
      <nav className="nav">
        <h1 className="nav-event">Spring Season Events</h1>
      </nav>
      <h2 className="title-card">Events for this month</h2>
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
            }) => {
              return (
                <Event
                  eventName={event.eventName}
                  eventType={event.eventType}
                  thumbnail={event.thumbnail}
                  description={event.description}
                  eventDate={event.eventDate}
                  key={event.eventName}
                  eventId={event.id}
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
