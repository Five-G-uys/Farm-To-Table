import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
interface AppProps {
  eventName: string;
  description: string;
  thumbnail: React.ImgHTMLAttributes<string>;
  eventType: string;
  eventDate: string;
  eventId: number;
  userRole: number;
  //getAllRSVPSEvents: () => void;
}

const RSVPLIST = ({
  eventName,
  description,
  thumbnail,
  eventType,
  eventDate,
  eventId,
  userRole,
}: //getAllRSVPSEvents,
AppProps) => {
  //const [events, setEvents] = useState({});
  //const [user, setUserId] = useState(0);

  // useEffect((): void => {
  //   // TAKE THIS AXIOS CALL TO GET USER
  //   axios
  //     .get<AxiosResponse>("/api/userProfile")
  //     .then(({ data }: AxiosResponse) => {
  //       console.log("userId", data);
  //       const { userRole } = data;
  //       setUserId(userRole);
  //     })
  //     .catch((err) => console.warn("Sorry it failed", err));
  // }, []);

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
  //     .catch((error) => {
  //       console.log("sorry, request failed", error);
  //     });
  // };
  // useEffect(() => {
  //   getAllEvents();
  //   // getAllRSVPSEvents();
  // }, []);

  // //console.log("Line 58", userId + "Event Id", eventId);
  // const handleEventResponse = () => {
  //   console.log("LINE 63", userId, " and ", eventId);
  //   axios
  //     .post(`/api/Rsvp/`, {
  //       userId: userId,
  //       eventId: eventId,
  //     })
  //     .then((data) => {
  //       console.log("66 LINE ", data);
  //     })
  //     .catch((err) => {
  //       console.error("68 REQUEST FAILED", err);
  //     });
  // };
  console.log(userRole);
  return (
    <div>
      {userRole > 3 ? (
        <div>TOTAL RSVP RESPONSES</div>
      ) : (
        <section>
          <h1 className="event-name">{eventName}</h1>
          <h4 className="event-date">{eventDate}</h4>
        </section>
      )}
    </div>
  );
};

export default RSVPLIST;
