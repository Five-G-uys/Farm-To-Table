/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useContext } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios, { AxiosResponse } from "axios";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import RSVPLIST from "./RSVPLIST";
import { UserContext } from "./App";
//import Profile ""

const RSVPS = () => {
  const user: any = useContext(UserContext);

  const { role_id, id } = user;

  const [rsvpEvents, setRsvpEvents] = useState({
    eventsToAttend: [],
    rsvpsTotal: 0,
    user_rsvps: 0,
  });

  
  const getAllRSVPSEvents = () => {
    if (role_id < 4) {
      axios
        .get(`/events/api/user/rsvps/${id}`)
        .then((data) => {
          console.log("LINE 33 FrontEND request", data.data);
          const newArr = data.data
            .map((eventObj: any) => {
              return eventObj.value;
            })
            .map((eventArr: any) => {
              return eventArr[0];
            });
          setRsvpEvents((state: any) => {
            return { ...state, eventsToAttend: newArr };
          });
        })
        .catch((err) => {
          console.log("LINE 48 FAILED", err);
        });
    }

    if (role_id === 4) {
      axios
        .get("/events/api/rsvps")
        .then((data) => {
          console.log("LINE 55 FrontEND request", data.data);
          const newArr = data.data;

          setRsvpEvents((state: any) => {
            return { ...state, rsvpsTotal: newArr.length };
          });
        })
        .catch((err) => {
          console.log("LINE 15 FAILED", err);
        });
    }
  };
  console.log(
    "LINE 75 ",
    rsvpEvents.eventsToAttend + "and" + rsvpEvents.rsvpsTotal + "number"
  );

  const { rsvpsTotal, eventsToAttend } = rsvpEvents;

  useEffect(() => {
    getAllRSVPSEvents();
  }, []);
  console.log("LINE 45", rsvpEvents.eventsToAttend);

  return (
    <div>
      {role_id < 4 && <h1>My Events to Attend</h1>}
      {role_id >= 4 ? (
        <h1>
          Total RSVPS
          <br></br>
          <p>{rsvpsTotal}</p>
        </h1>
      ) : (
        eventsToAttend.length > 0 &&
        eventsToAttend.map(
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
              eventDate,
              eventType,
              description,
              id,
              thumbnail,
              location,
            } = event;
            return (
              <RSVPLIST
                eventName={eventName}
                eventType={eventType}
                thumbnail={thumbnail}
                description={description}
                eventDate={eventDate}
                key={id | role_id}
                eventId={id}
                userRole={role_id}
                location={location}
                getAllRSVPSEvents={getAllRSVPSEvents}
              />
            );
          }
        )
      )}
    </div>
  );
};

export default RSVPS;
