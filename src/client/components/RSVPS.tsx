import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import RSVPLIST from "./RSVPLIST";

const RSVPS = () => {
  const [user, setUserId] = useState({ role_id: 0, userId: 1 });

  useEffect((): void => {
    // TAKE THIS AXIOS CALL TO GET USER
    axios
      .get<AxiosResponse>("/api/userProfile")
      .then(({ data }: AxiosResponse) => {
        //console.log("userId Role", data);
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
  });

  const getAllRSVPSEvents = () => {
    // if (role_id !== undefined && role_id < 4) {
    //   axios
    //     .get(`/api/user/rsvps/${userId}`)
    //     .then((data) => {
    //       console.log("LINE 28 FrontEND request", data.data);
    //       const newArr = data.data
    //         .map((eventObj: any) => {
    //           return eventObj.value;
    //         })
    //         .map((eventArr: any) => {
    //           return eventArr[0];
    //         });
    //       console.log(newArr);
    //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //       setRsvpEvents((state: any) => {
    //         return { ...state, eventsToAttend: newArr };
    //       });
    //     })
    //     .catch((err) => {
    //       console.log("LINE 48 FAILED", err);
    //     });
    if (role_id > 3) {
      axios
        .get(`/api/rsvps`)
        .then((data) => {
          console.log("LINE 28 FrontEND request", data.data);
          const newArr = data.data;
          // .map((eventObj: any) => {
          //   return eventObj.value;
          // })
          // .map((eventArr: any) => {
          //   return eventArr[0];
          // });
          console.log("What's new Arr here", newArr);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setRsvpEvents((state: any) => {
            return { ...state, eventsToAttend: newArr };
          });
        })
        .catch((err) => {
          console.log("LINE 15 FAILED", err);
        });
    }
  };
  console.log("LINE 25", rsvpEvents.eventsToAttend);
  useEffect(() => {
    getAllRSVPSEvents();
  }, []);
  console.log("LINE 45", rsvpEvents.eventsToAttend);

  return (
    <div>
      {role_id > 3 ? (
        <h1>ALL RSVPS {role_id}</h1>
      ) : (
        <h1>My Events to Attend</h1> &&
        rsvpEvents.eventsToAttend.length > 0 &&
        rsvpEvents.eventsToAttend.map(
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
                key={event.eventName}
                eventId={event.id}
                role_id={role_id}
              />
            );
          }
        )
      )}
    </div>
  );
};

export default RSVPS;
