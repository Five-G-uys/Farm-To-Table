import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import RSVPLIST from "./RSVPLIST";

const RSVPS = () => {
  const [user, setUserId] = useState({ role_id: 0, userId: 1 });

  useEffect((): void => {
    // TAKE THIS AXIOS CALL TO GET USER
    axios
      .get<AxiosResponse>("/auth/api/userProfile")
      .then(({ data }: AxiosResponse) => {
        console.log("userId Role", data);
        const { role_id, id } = data;

        setUserId((state) => {
          return { ...state, userId: id, role_id: role_id };
        });
      })
      .catch((err) => console.warn("Sorry it failed", err));
  }, []);

  const { role_id, userId } = user;
  const [rsvpEvents, setRsvpEvents] = useState({
    eventsToAttend: [],
    rsvpsTotal: 0,
  });

  console.log("LINE 28", role_id);

  const getAllRSVPSEvents = () => {
    // if (role_id === 4) {

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
    // }

    if (role_id < 4) {
      axios
        .get(`/events/api/user/rsvps/${userId}`)
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
    } else {
      console.log("YOUR ROLE IS NOT AN ADMIN");
    }
  };
  console.log(
    "LINE 75 ",
    rsvpEvents.eventsToAttend + "and" + rsvpEvents.rsvpsTotal + "number"
  );
  useEffect(() => {
    getAllRSVPSEvents();
  }, []);
  console.log("LINE 45", rsvpEvents.eventsToAttend);

  const { rsvpsTotal, eventsToAttend } = rsvpEvents;
  return (
    <div>
      {role_id >= 4 ? (
        <h1>
          Total RSVPS
          <br></br>
          <h3>{rsvpsTotal}</h3>
        </h1>
      ) : (
        <h1>My Events to Attend</h1> &&
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
            role_id: number;
          }) => {
            return (
              <RSVPLIST
                eventName={event.eventName}
                eventType={event.eventType}
                thumbnail={event.thumbnail}
                description={event.description}
                eventDate={event.eventDate}
                key={event.id | 7}
                eventId={event.id}
                userRole={role_id}
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
