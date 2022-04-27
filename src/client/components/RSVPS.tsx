import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import Event from "./Event";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import RSVPLIST from "./RSVPLIST";

const RSVPS = () => {
  const [userId, setUserId] = useState(1);

  useEffect((): void => {
    // TAKE THIS AXIOS CALL TO GET USER
    axios
      .get<AxiosResponse>("/api/userProfile")
      .then(({ data }: AxiosResponse) => {
        console.log("userId", data);
        const { id } = data;
        setUserId(id);
      })
      .catch((err) => console.warn("Sorry it failed", err));
  }, []);

  const [rsvpEvents, setRsvpEvents] = useState({
    eventsToAttend: [],
  });
  const getAllRSVPSEvents = () => {
    console.log("LINE 25 RSVP", rsvpEvents);
    axios
      .get(`/api/user/rsvps/${userId}`)
      .then((data) => {
        console.log("LINE 12 FrontEND request", data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setRsvpEvents((state: any) => {
          return { ...state, eventsToAttend: data.data[0].value };
        });
      })
      .catch((err) => {
        console.log("LINE 15 FAILED", err);
      });
  };

  console.log("LINE 25", rsvpEvents);
  useEffect(() => {
    getAllRSVPSEvents();
  }, []);
  console.log("LINE 45", rsvpEvents.eventsToAttend);

  return (
    <div>
      <div>RSVPS GO HERE</div>
      {rsvpEvents.eventsToAttend.length > 0 &&
        rsvpEvents.eventsToAttend.map(
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
              <RSVPLIST
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
  );
};

export default RSVPS;
