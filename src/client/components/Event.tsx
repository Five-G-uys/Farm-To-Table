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
  getAllEvents: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //const [events, setEvents] = useState({});
  const [userId, setUserId] = useState(0);
  useEffect((): void => {
    // TAKE THIS AXIOS CALL TO GET USER
    axios
      .get<AxiosResponse>("/api/userProfile")
      .then(({ data }: AxiosResponse) => {
        console.log("userId", data);
        const { role_id } = data;
        setUserId(role_id);
      })
      .catch((err) => console.warn("Sorry it failed", err));
  }, []);

  // const getAllEvents = () => {
  //   axios
  //     .get("/events")
  //     .then((data) => {
  //       //console.log("SUCESSFULLY FECTHED DATA", data.data);
  //       setEvents((state) => {
  //         return {
  //           ...state,
  //           eventArray: [...data.data],
  //         };
  //       });
  //     })
  //     .catch((error: unknown) => {
  //       console.log("sorry, request failed", error);
  //     });
  // };
  // useEffect(() => {
  //   getAllEvents();
  //   // getAllRSVPSEvents();
  // }, []);

  //console.log("Line 58", userId + "Event Id", eventId);
  const handRSVPosts = () => {
    console.log("LINE 63", userId, " and ", eventId);
    axios
      .post(`/api/Rsvp/`, {
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
      .delete("/api/event/delete", {
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

  console.log("LINE 78", userId);
  return (
    <div>
      <div></div>
      {thumbnail && (
        <>
          <div>
            <h1 className="event-name">{eventName}</h1>
            <div>{userId}</div>
          </div>
          <section className="sect-event">
            <img src={thumbnail} className="event-img" />
            <div className="text-card">
              <h3 className="event-desc">{description}</h3>
              <h3 className="event-category">{eventType}</h3>
              <h4 className="event-date">{eventDate}</h4>
              {userId > 3 ? (
                <button onClick={deleteEvent}>Click to delete event</button>
              ) : (
                <button onClick={handRSVPosts}>RSVP to this event</button>
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
