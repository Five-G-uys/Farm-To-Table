// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UrlWithStringQuery } from "node:url";
import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
//import RSVPS from "./RSVPS";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface AppProps {
  eventName: string;
  description: string;
  thumbnail: React.ImgHTMLAttributes<string>;
  eventType: string;
  eventDate: string;
  eventId: number;
  getAllEvents: () => void;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Event = ({
  eventName,
  description,
  thumbnail,
  eventType,
  eventDate,
  eventId,
  getAllEvents,
}: //getAllRSVPSEvents,
AppProps) => {
  const [userId, setUserId] = useState(0);
  const [userRole, setUserRole] = useState(0);
  useEffect((): void => {
    // TAKE THIS AXIOS CALL TO GET USER
    console.log("IS THIS FUNCTION RUNNING?");
    axios
      .get<AxiosResponse>("/auth/api/userProfile")
      .then(({ data }: any) => {
        console.log("LINE 37 EVENT COMPONENT userId", data);
        const { id, role_id } = data;
        setUserId(id);
        setUserRole(role_id);
      })
      .catch((err) => console.warn("Sorry it failed", err));
  }, []);

  const handRSVPosts = () => {
    console.log("LINE 63", userId, " and ", eventId);
    axios
      .post("/events/api/Rsvp/", {
        userId: userId,
        eventId: eventId,
      })
      .then((data) => {
        console.log("66 LINE ", data);
      })
      .catch((err) => {
        console.error("68 REQUEST FAILED", err);
      });
  };

  //patch request for deleteting an event in the database
  const deleteEvent = () => {
    console.log("LINE 81", userId, " and ", eventId);
    axios
      .delete("/events/api/event/delete", {
        params: { id: eventId },
      })
      .then((data) => {
        console.log("87 LINE ", data);
        getAllEvents();
      })
      .catch((err) => {
        console.error("91 REQUEST FAILED", err);
      });
  };

  console.log("LINE 78", userId + "AND USER ROLE ", userRole);
  return (
    <div>
      <div></div>
      {thumbnail && (
        <>
          <div>
            <h1 className="event-name">{eventName}</h1>
            <div></div>
          </div>
          <section className="sect-event">
            <img src={thumbnail} className="event-img" />
            <div className="text-card">
              <h3 className="event-desc">{description}</h3>
              <h3 className="event-category">{eventType}</h3>
              <h4 className="event-date">{eventDate}</h4>
              {userRole > 3 ? (
                <button onClick={deleteEvent}>Delete Event</button>
              ) : (
                <button onClick={handRSVPosts}>Click to Attend</button>
              )}
            </div>
          </section>
          <div>{/* <RSVPS /> */}</div>
        </>
      )}
    </div>
  );
};

export default Event;
