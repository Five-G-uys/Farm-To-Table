import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./App";
import { Link } from "react-router-dom";

// import { styled } from '@mui/material/styles';
import Card from "@mui/material/Card";
// import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
// import Collapse from '@mui/material/Collapse';
// import Avatar from '@mui/material/Avatar';
// import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from "@mui/material/Typography";
// import { red } from '@mui/material/colors';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from "@mui/material/Button";
// import Stack from '@mui/material/Stack';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import { loadCSS } from 'fg-loadcss';
import Box from "@mui/material/Box";
import axios from "axios";
//import { green } from "@mui/material/colors";
// import Icon from '@mui/material/Icon';

// import dayjs from 'dayjs';
// import green from '@material-ui/core/colors/green';

const RSVPLIST = ({
  eventName,
  eventId,
  // rsvpsCount,
  location,
  getAllRSVPSEvents,
}: any) => {
  const user: { roleId: number; id: number } = useContext(UserContext);
  const { id }: { roleId: number; id: number } = user;

  const pages = [{ name: "Events", path: "/events-page" }];

  //patch request for deleteting an event in the database
  const deleteRsvpsEvent = () => {
    //console.log("LINE 81", id, " and ", eventId);
    axios
      .delete("/api/rsvps", {
        params: { userId: id, eventId: eventId },
      })
      .then((data) => {
        //console.log("52 LINE ", data);
        getAllRSVPSEvents();
      })
      .catch((err) => {
        console.error("91 REQUEST FAILED", err);
      });
  };

  return (
    <Box alignContent="right">
      {/* <Card
        sx={{
          minWidth: 300,
          borderRadius: "1.2rem",
          boxShadow: 10,
          size: "large",
          marginLeft: "18px",
          alignContent: "right",
        }}
      > */}
      {/* Added Link tag to events in the profile page */}
      <Button href={`${pages[0].path}`} color="success">
        Event Details
      </Button>
      <Paper
        sx={{
          minWidth: 300,
          borderRadius: "1.2rem",
          boxShadow: 10,
          size: "large",
          marginLeft: "18px",
          alignContent: "right",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {eventName}
          <br></br>
          {location}
          <br></br>
          <button onClick={deleteRsvpsEvent}>cancel</button>
        </Typography>
      </Paper>
      {/* </Card> */}
    </Box>
  );
};

export default RSVPLIST;
