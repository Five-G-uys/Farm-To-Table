import React from "react";

interface AppProps {
  eventName: string;
  description: string;
  thumbnail: React.ImgHTMLAttributes<string>;
  eventType: string;
  eventDate: string;
  eventId: number;
  //getAllRSVPSEvents: () => void;
}

const RSVPLIST = ({
  eventName,
  description,
  thumbnail,
  eventType,
  eventDate,
  eventId,
}: //getAllRSVPSEvents,
AppProps) => {
  // const [events, setEvents] = useState({});
  // const [userId, setUserId] = useState(0);

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
  console.log(description);
  return (
    <div>
      <h1 className="event-name">{eventName}</h1>
      {thumbnail && (
        <>
          <div>{/* <div>{userId}</div> */}</div>
          <section className="sect-event">
            <img src={thumbnail} className="event-img" />
            <div className="text-card">
              <h3 className="event-desc">{description}</h3>
              <h3 className="event-category">{eventType}</h3>
              <h4 className="event-date">{eventDate}</h4>
              <h4>{eventId}</h4>
              {/* <button onClick={handleEventResponse}>RSVP to this event</button> */}
            </div>
          </section>
          <div>{/* <RSVPS /> */}</div>
        </>
      )}
    </div>
  );
};

export default RSVPLIST;
