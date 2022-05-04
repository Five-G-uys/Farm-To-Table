/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useContext } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios, { AxiosResponse } from "axios";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import RSVPLIST from "./RSVPLIST";
import { UserContext } from "./App";
import { CardContent, Typography } from "@mui/material";
//import Profile ""

const RSVPS = () => {
  const user: any = useContext(UserContext);
  const { role_id, id } = user;

  const [rsvps, setRsvps] = useState([]);
  const [rsvpsCount, setRsvpsCount] = useState(0);

  const getAllRSVPSEvents = () => {
    axios
      .get(`/events/api/user/rsvps/${id}`)
      .then(({ data }) => {
        console.log("LINE 33 FrontEND request", data);
        const newArr = data
          .map((eventObj: any) => {
            return eventObj.value;
          })
          .map((eventArr: any) => {
            return eventArr[0];
          });
        setRsvps(newArr);
        setRsvpsCount(newArr.length);
      })
      .catch((err) => {
        console.log("LINE 48 FAILED", err);
      });
  };

  console.log("LINE 75 ", rsvps + "and" + rsvpsCount + "number");

  console.log("LINE 45", rsvps);
  useEffect(() => {
    getAllRSVPSEvents();
  }, []);

  return (
    <div>
      {role_id < 4 && (
        <Typography variant="h4" component="h5">
          My Events to Attend
        </Typography>
      )}
      {role_id >= 4 ? (
        <CardContent>
          Total RSVPS
          <br></br>
          <Typography variant="h4" component="h5">
            {rsvpsCount}
          </Typography>
        </CardContent>
      ) : (
        rsvps.length > 0 &&
        rsvps.map(
          (event: {
            eventName: string;
            description: string;
            thumbnail: React.ImgHTMLAttributes<string>;
            eventType: string;
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
                eventId={id}
                key={id | role_id}
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
