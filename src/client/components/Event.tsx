/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UrlWithStringQuery } from "node:url";
import React, { useState, useEffect, useContext } from "react";
import axios, { AxiosResponse } from "axios";
import { UserContext } from "./App";

//////////////////////MATERIAL UI/////////////////////////////////
// MUI Imports
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
import Icon from "@mui/material/Icon";
import green from "@material-ui/core/colors/green";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

// PASS EXPANDMORE THROUGH PROPS FROM PARENT: ALSO USED IN product CARD COMPONENT
const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Event = ({
  event,
  handleEditClick,
  inEditMode,
  getAllEvents,
  updateState,
}: any) => {
  const user: any = useContext(UserContext);
  console.log("THIS IS WORKING", user);
  const { id } = user;
  const [expanded, setExpanded] = useState(false);
  const [userRsvp, setUserRsvp] = useState("Not going");

  // toggle bool
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handRSVPosts = () => {
    setUserRsvp("going");
    axios
      .post("/events/api/Rsvp/", {
        userId: id,
        event_id: event.id,
      })
      .then((data) => {
        setUserRsvp((rsvp) => (rsvp += "going"));
        updateState();
        console.log("66 LINE ", data);
      })
      .catch((err) => {
        console.error("68 REQUEST FAILED", err);
      });
  };

  //delete request for deleteting an event in the database
  const deleteEvent = () => {
    console.log("LINE 81", user.id, " and ", event.id);
    axios
      .delete(`/events/api/event/${event.id}`, {
        params: { id: event.id },
      })
      .then((data) => {
        console.log("87 LINE ", data);
        // updateState();
        getAllEvents();
      })
      .catch((err) => {
        console.error("91 REQUEST FAILED", err);
      });
  };
  const { roleId } = user;
  console.log("Event Line 107", userRsvp);

  return (
    <Card
      sx={{
        minWidth: 300,
        borderRadius: "2.5rem",
        boxShadow: 24,
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
            font-size="20px"
          >
            {event.eventName[0]}
          </Avatar>
        }
        subheader={`Date of Event ${event.eventDate}`}
        // NEED TO FIGURE OUT HOW TO MATCH productS TO WEEKS
        fontSize="20px"
        title={event.eventName}
      />
      {event.thumbnail ? (
        <CardMedia component="img" height="300" image={event.thumbnail} />
      ) : (
        ""
      )}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {`location ${event.location}`}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {`${event.eventType}`}
        </Typography>
      </CardContent>
      <CardContent>
        {/* // setup map that returns all product info */}
        <Typography paragraph> {event.description}</Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ justifyContent: "center" }}>
        <Stack spacing={5} direction="row" id="product_card_stack">
          <ExpandMore sx={{ color: "green" }} expand={expanded}>
            {roleId > 3 && (
              <DeleteIcon sx={{ color: "green" }} onClick={deleteEvent} />
            )}
          </ExpandMore>
          {roleId < 4 && (
            <ExpandMore sx={{ color: "green" }} expand={expanded}>
              <Icon
                baseClassName="fas"
                className="fa-plus-circle"
                fontSize="large"
                onClick={handRSVPosts}
              >
                +
              </Icon>
            </ExpandMore>
          )}
          <ExpandMore expand={false}>{userRsvp}</ExpandMore>
          {roleId > 3 && (
            <ExpandMore
              sx={{ color: "green" }}
              expand={expanded}
              onClick={() => handleEditClick(event.id)}
            >
              <EditIcon sx={{ color: "green" }} />
            </ExpandMore>
          )}
          <ExpandMore
            sx={{ color: "green" }}
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </Stack>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit></Collapse>
    </Card>
  );
};

export default Event;
