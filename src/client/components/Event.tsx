// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UrlWithStringQuery } from "node:url";
import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface AppProps {
  eventName: string;
  description: string;
  thumbnail: React.ImgHTMLAttributes<string>;
  eventType: string;
  eventDate: string;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Event = ({
  eventName,
  description,
  thumbnail,
  eventType,
  eventDate,
}: AppProps) => {
  console.log("LINE 37", eventName, description, thumbnail);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [events, setEvents] = useState({});

  const [userId, setUserId] = useState(0);

  useEffect((): void => {
    // TAKE THIS AXIOS CALL TO GET USER
    axios
      .get<AxiosResponse>("/api/userProfile")
      .then(({ data }: AxiosResponse) => {
        console.log("USerID", data.id);
        const { id } = data;
        setUserId(id);
      })
      .catch((err) => console.warn(err));
  }, []);
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

  return (
    <div>
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
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Event;
