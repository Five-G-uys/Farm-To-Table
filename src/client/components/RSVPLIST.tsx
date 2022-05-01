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
  location: string;
  getAllRSVPSEvents(): void;
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
  getAllRSVPSEvents,
  location,
}: //getAllRSVPSEvents,
AppProps) => {
  //const [events, setEvents] = useState({});
  const [userId, setUserId] = useState(1);

  // useEffect((): void => {
  //   // TAKE THIS AXIOS CALL TO GET USER
  //   axios
  //     .get<AxiosResponse>("/api/userProfile")
  //     .then(({ data }: AxiosResponse) => {
  //       console.log("userId", data);
  //       const { id } = data;
  //       setUserId(id);
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

  useEffect(() => {
    //getAllEvents();
    getAllRSVPSEvents();
  }, []);

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
  //patch request for deleteting an event in the database
  const deleteRsvpsEvent = () => {
    console.log("LINE 81", userId, " and ", eventId);
    axios
      .delete("/events/api/user/rsvps/delete", {
        params: { id: 1, event_id: eventId },
      })
      .then((data) => {
        console.log("87 LINE ", data);
        //getAllEvents();
      })
      .catch((err) => {
        console.error("91 REQUEST FAILED", err);
      });
  };

  console.log(userRole);
  useEffect(() => {
    getAllRSVPSEvents();
  }, []);
  return (
    <div>
      {userRole > 3 ? (
        <div>TOTAL RSVP RESPONSES</div>
      ) : (
        <section className="user-rsvps">
          <h1 className="user-event-name">{eventName}</h1>
          <h1 className="user-event-type">{eventType}</h1>
          <h4 className="user-event-date">{eventDate}</h4>
          <h4 className="user-event-loc">{location}</h4>
          <button onClick={deleteRsvpsEvent}>
            Can't attend smthing came up
          </button>
        </section>
      )}
    </div>
  );
};

export default RSVPLIST;
