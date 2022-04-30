/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UrlWithStringQuery } from "node:url";
import React, { useState, useEffect, useContext } from "react";
import axios, { AxiosResponse } from "axios";
import { UserContext } from "./App";
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
  location: string;
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
  location,
}: //getAllRSVPSEvents,
AppProps) => {
  const user: any = useContext(UserContext);
  console.log("THIS IS WORKING", user);

  const handRSVPosts = () => {
    console.log("LINE 63", user.id, " and ", eventId);
    axios
      .post("/events/api/Rsvp/", {
        userId: user.id,
        eventId: eventId,
      })
      .then((data) => {
        console.log("66 LINE ", data);
      })
      .catch((err) => {
        console.error("68 REQUEST FAILED", err);
      });
  };

  //delete request for deleteting an event in the database
  const deleteEvent = () => {
    console.log("LINE 81", user.id, " and ", eventId);
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

  console.log("LINE 78", user.id + "AND USER ROLE ", user.role_id);
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
              <h3 className="event-desc">Description: {description}</h3>
              <h3 className="event-category">Type of event: {eventType}</h3>
              <h4 className="event-date">Date: {eventDate}</h4>
              <h4 className="event-date">Location: {location}</h4>
              {user.role_id > 3 ? (
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
