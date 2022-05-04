/* eslint-disable @typescript-eslint/no-unused-vars */
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
  handleEditClick: () => void;
}

const EventCard = ({
  handleEditClick,
  allEvents,
  updateCounter,
  inEditMode,
  updateState,
}: AppProps | any) => {
  
  const user: any = useContext(UserContext);

  console.log("line 32", allEvents);

  return (
    <div className="events">
      <nav className="nav">
        <h1 className="nav-event">Spring: events for the month of May</h1>
      </nav>
      <br></br>
      <br></br>
      <div className="card">
        {Array.isArray(allEvents) &&
          allEvents.map((event: any) => {
            return (
              <Event
                event={event}
                updateCounter={updateCounter}
                handleEditClick={handleEditClick}
                inEditMode={inEditMode}
                updateState={updateState}
              />
            );
          })}
      </div>
      <footer className="footer"></footer>
    </div>
  );
};

export default EventCard;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
