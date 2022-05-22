// Import Dependencies
import React, { useContext } from "react";
import { UserContext } from "./App";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import axios from "axios";

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

// Export Component
export default RSVPLIST;
