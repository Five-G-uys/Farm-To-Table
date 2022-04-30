// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useEffect, useContext } from "react";
import Event from "./Event";
import axios from "axios";
import { UserContext } from "./App";
//import RSVPS from "./RSVPS";
interface AppProps {
  eventName: string;
  description: string;
  thumbnail: React.ImgHTMLAttributes<string>;
  eventType: string;
  eventDate: string;
  eventId: number;
  getAllEvents: () => void;
  location: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EventCard = ({ getAllEvents, allEvents }: AppProps | any) => {
  const user: unknown = useContext(UserContext);

  console.log("THIS IS WORKING", user);
  const { role_id, id } = user;
  //const [events, setEvents] = useState({ allEvents: [] });
  //const [counter, setCounter] = useState(0);

  useEffect(() => {
    getAllEvents();
  }, []);

  //const { allEvents } = events;
  console.log("line 28", allEvents);

  return (
    <div className="events">
      <nav className="nav">
        <h1 className="nav-event">Spring Season Events</h1>
      </nav>
      <h1 className="title-card">Events for this month</h1>
      <br></br>
      <br></br>
      <div className="card">
        {Array.isArray(allEvents) &&
          allEvents.map(
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
function userContext(UserContext: any): any {
  throw new Error("Function not implemented.");
}
