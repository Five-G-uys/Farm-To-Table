import React, { useContext, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { UserContext } from "./App";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { loadCSS } from "fg-loadcss";
import Box from "@mui/material/Box";
//import { green } from "@mui/material/colors";
import Icon from "@mui/material/Icon";

import dayjs from "dayjs";
import green from "@material-ui/core/colors/green";

// interface AppProps {
//   eventName: string;
//   description: string;
//   thumbnail: React.ImgHTMLAttributes<string>;
//   eventType: string;
//   eventDate: string;
//   eventId: number;
//   userRole: number;
//   location: string;
//   getAllRSVPSEvents(): void;
//   //getAllRSVPSEvents: () => void;
// }

const RSVPLIST = ({
  eventName,
  eventType,
  eventDate,
  eventId,
  userRole,
  rsvpsCount,
  location,
}: //getAllRSVPSEvents,
any) => {
  const user: any = useContext(UserContext);
  const { role_id, id } = user;

  //patch request for deleteting an event in the database
  const deleteRsvpsEvent = () => {
    console.log("LINE 81", id, " and ", eventId);
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

  return (
    <div>
      {userRole > 3 ? (
        <div>{rsvpsCount} TOTAL RSVP RESPONSES</div>
      ) : (
        <section className="user-rsvps">
          <Box>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                <h1 className="user-event-name">{eventName}</h1>
                <h1 className="user-event-type">{eventType}</h1>
                <h4 className="user-event-date">{eventDate}</h4>
                <h4 className="user-event-loc">{location}</h4>
                <button onClick={deleteRsvpsEvent}>
                  Can't attend smthing came up
                </button>
              </Typography>
            </CardContent>
          </Box>
        </section>
      )}
    </div>
  );
};

export default RSVPLIST;
