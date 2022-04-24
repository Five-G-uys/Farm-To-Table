import React, { useState, useEffect } from "react";
import Event from "./Event";
import axios from "axios";

const EventCard = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [events, setEvents] = useState({ eventArray: {} });

  const getAllEvents = () => {
    axios
      .get("/events")
      .then((data) => {
        console.log("SUCESSFULLY FECTHED DATA", data.data);
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
  console.log("line 28", eventArray);

  return (
    <div>
      <h1 className="card-event">Spring Season Events</h1>
      <div className="card">
        {Array.isArray(eventArray) &&
          eventArray.map(
            (event: {
              eventName: string;
              description: string;
              thumbnail: React.ImgHTMLAttributes<string>;
              category: string;
              id: number;
              eventDate: string;
            }) => {
              return (
                <Event
                  eventName={event.eventName}
                  category={event.category}
                  thumbnail={event.thumbnail}
                  description={event.description}
                  eventDate={event.eventDate}
                  key={event.id}
                />
              );
            }
          )}
      </div>
    </div>
  );
};

export default EventCard;
