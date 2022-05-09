/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
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
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

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
  rsvps,
}: any) => {
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const user: any = useContext(UserContext);
  const { id } = user;
  console.log("USER ID", id);
  const [expanded, setExpanded] = useState(false);
  const [rsvpCount, setRsvpCount] = useState(0);
  const [isGoing, setIsGoing] = useState(false);
  const [totalRsvp, setTotalRsvp] = useState(0);
  const [updateCounter, setUpdateCounter] = useState(0);
  const { roleId } = user;

  ////////???????POSTS AN RSVP FROM USER IN THE DB???????///////////////////////
  const handRSVPosts = () => {
    axios
      .post("/api/rsvps/", {
        userId: id,
        eventId: event.id,
      })
      .then(({ data }: any) => {
        setRsvpCount(data);
        //console.log("Line 85", data);
        getAllEvents();
        setIsGoing(true);
      })
      .catch((err) => {
        console.error("68 REQUEST FAILED", err);
      });
  };
  /////////////??????????GETS THE RSVP COUNT FOR A USER?????////////////////
  const getUserRsvpCount = () => {
    axios
      .get(`/api/rsvps/${id}`, {
        params: { userId: id, eventId: event.id },
      })
      .then(({ data }) => {
        console.log("count for user rsvps", data);
        setRsvpCount(data.length);
        if (data.length > 0) {
          setIsGoing(true);
        } else {
          setIsGoing(false);
        }
      })
      .catch((err) => {
        console.error("a blunder occured", err);
      });
  };

  /////////////////???GETS THE COUNT OF ALL RSVPS IN DB ????///////////
  const totalEventRsvps = () => {
    axios
      .get(`/api/rsvps/total/${event.id}`, { params: { eventId: event.id } })
      .then((data) => {
        console.log("Line 132 total rsvps", data.data.length);
        setTotalRsvp(data.data.length);
      })
      .catch((err) => {
        console.log("135 rsvps error", err);
      });
  };

  const check = () => {
    if (user.roleId < 4) {
      isGoing ? "You are going" : "Not going";
    } else {
      return null;
    }
  };
  //??????DELETES EVENT ??????/////////////////////////
  const deleteEvent = () => {
    axios
      .delete(`/api/events/${event.id}`, {
        params: { id: event.id },
      })
      .then((data) => {
        getAllEvents();
      })
      .catch((err) => {
        console.error("91 REQUEST FAILED", err);
      });
  };

  //////?????????DELETE RSVP???????????????????///////
  const deleteRsvpsEvent = () => {
    // console.log("LINE 81", id, " and ", eventId);
    axios
      .delete(`/api/rsvp/delete/${id}`, {
        params: { userId: id, eventId: event.id },
      })
      .then((data) => {
        setUpdateCounter(updateCounter + 1);
        console.log("52 LINE ", data);
        getUserRsvpCount();
      })
      .catch((err) => {
        console.error("91 REQUEST FAILED", err);
      });
  };

  ////////////////////////////////////////////
  useEffect(() => {
    if (user.roleId < 4) {
      getUserRsvpCount();
    } else {
      totalEventRsvps();
    }
  }, [updateCounter]);

  return (
    <Card
      sx={{
        minWidth: 300,
        borderRadius: "2.5rem",
        boxShadow: 24,
        size: "large",
      }}
    >
      <CardHeader
        subheader={`Date of Event: ${event.eventDate}`}
        // NEED TO FIGURE OUT HOW TO MATCH productS TO WEEKS
        title={event.eventName}
      />
      {event.thumbnail ? (
        <CardMedia component="img" height="300" image={event.thumbnail} />
      ) : (
        ""
      )}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {`Address: ${event.location}`}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {`${event.eventType}`}
        </Typography>
      </CardContent>
      <CardContent>
        {/* // setup map that returns all product info */}

        <Typography paragraph>
          {user.roleId < 4
            ? `${
                rsvpCount === 1
                  ? "one person is attending"
                  : `${rsvpCount} people are attending`
              }`
            : `RSVPS: ${totalRsvp}`}
        </Typography>
        <Typography paragraph>
          {" "}
          {user.roleId > 3
            ? null
            : `${isGoing ? "You are Going" : " Not going"}`}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ justifyContent: "center" }}>
        <Stack spacing={5} direction="row" id="product_card_stack">
          <ExpandMore sx={{ color: "green" }} expand={expanded}>
            {roleId > 3 && (
              <DeleteIcon sx={{ color: "green" }} onClick={deleteEvent} />
            )}
          </ExpandMore>
          <ExpandMore sx={{ color: "green" }} expand={expanded}>
            {roleId < 4 && (
              <Button onClick={handRSVPosts} color="success">
                RSVP
              </Button>
            )}
          </ExpandMore>

          {roleId > 3 && (
            <ExpandMore
              sx={{ color: "green" }}
              expand={expanded}
              onClick={() => handleEditClick(event.id)}
            >
              <EditIcon sx={{ color: "green" }} />
            </ExpandMore>
          )}
          {roleId < 4 && (
            <ExpandMore
              sx={{ color: "green" }}
              expand={expanded}
              onClick={() => deleteRsvpsEvent()}
            >
              <DeleteIcon sx={{ color: "green" }} />
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
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {" "}
        <Typography paragraph>
          {" "}
          {`Description: ${event.description}`}
        </Typography>
      </Collapse>
    </Card>
  );
};

export default Event;

{
  /* <ExpandMore sx={{ color: "green" }} expand={expanded}>
            {roleId < 4 && (
              <Icon
                baseClassName="fas"
                className="fa-plus-circle"
                fontSize="medium"
                onClick={handRSVPosts}
              >
                Go
              </Icon>
            )}
          </ExpandMore> */
}

// avatar={
//   <Avatar
//     sx={{ bgcolor: red[500] }}
//     aria-label="recipe"
//     font-Size="12px"
//   >
//     {event.eventName[0]}
//   </Avatar>
// }
