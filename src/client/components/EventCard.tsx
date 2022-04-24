import React, { useState, useEffect, ReactNode } from "react";
import axios from "axios";
import Event from "./Event";
import { Key } from "node:readline";
import { eventNames } from "node:process";
const EventCard = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [events, setEvents] = useState({ eventArray: {} });
  const getAllEvents = () => {
    axios
      .get("/events")
      .then((data) => {
        console.log("SUCESSFULLY FECTHED DATA", Array.isArray(data.data));
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
  console.log("line 28", Array.isArray(eventArray));

  return (
    <div>
      <h1 className="card-event">Events for this month</h1>
      <div className="card">
        {Array.isArray(eventArray) &&
          eventArray.map(
            (event: {
              eventName: string;
              description: string;
              thumbnail: React.ImgHTMLAttributes<string>;
              category: string;
              id: number;
            }) => {
              return (
                <Event
                  eventName={event.eventName}
                  category={event.category}
                  thumbnail={event.thumbnail}
                  description={event.description}
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
