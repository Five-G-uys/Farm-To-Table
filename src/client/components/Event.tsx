/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UrlWithStringQuery } from 'node:url';
import React, { useState, useEffect, useContext } from 'react';
import axios, { AxiosResponse } from 'axios';
import { UserContext } from './App';

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
//import { green } from "@mui/material/colors";
import Icon from "@mui/material/Icon";

import dayjs from "dayjs";
import green from "@material-ui/core/colors/green";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

// PASS EXPANDMORE THROUGH PROPS FROM PARENT: ALSO USED IN product CARD COMPONENT
const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Event = ({
  eventName,
  description,
  thumbnail,
  eventType,
  eventDate,
  eventId,
  getAllEvents,
  location,
  event,
  handleEditClick,
}: any) => {
  const user: any = useContext(UserContext);
  console.log('THIS IS WORKING', user);

  const [expanded, setExpanded] = useState(false);

  // toggle bool
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handRSVPosts = () => {
    console.log('LINE 63', user.id, ' and ', eventId);
    axios
      .post('/events/api/Rsvp/', {
        userId: user.id,
        eventId: eventId,
      })
      .then((data) => {
        console.log('66 LINE ', data);
      })
      .catch((err) => {
        console.error('68 REQUEST FAILED', err);
      });
  };

  //delete request for deleting an event in the database
  const deleteEvent = () => {
    console.log('LINE 81', user.id, ' and ', eventId);
    axios
      .delete('/events/api/event/delete', {
        params: { id: eventId },
      })
      .then((data) => {
        console.log('87 LINE ', data);
        getAllEvents();
      })
      .catch((err) => {
        console.error('91 REQUEST FAILED', err);
      });
  };
  const hover = () => {
    return <p>Click to participate</p>;
  };
  //console.log("LINE 78", user.id + "AND USER ROLE ", user.role_id);
  return (
    <Card
      sx={{
        minWidth: 300,
        minHeight: 200,
        borderRadius: '2.5rem',
        boxShadow: 24,
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            aria-label='recipe'
            font-size='20px'
          >
            {eventName[0]}
          </Avatar>
        }
        subheader={`Date of Event ${eventDate}`}
        // NEED TO FIGURE OUT HOW TO MATCH productS TO WEEKS
        title={eventName}
      />
      {thumbnail ? (
        <CardMedia component='img' height='300' image={thumbnail} />
      ) : (
        ''
      )}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {`location ${location}`}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {`Type of event ${eventType}`}
        </Typography>
      </CardContent>

      <CardActions disableSpacing sx={{ justifyContent: 'center' }}>
        <Stack spacing={5} direction='row' id='product_card_stack'>
          <ExpandMore sx={{ color: 'green' }} expand={expanded}>
            <DeleteIcon sx={{ color: 'green' }} onClick={deleteEvent} />
          </ExpandMore>
          <ExpandMore sx={{ color: "green" }} expand={expanded}>
            <Icon
              baseClassName="fas"
              className="fa-plus-circle"
              fontSize="small"
              onClick={handRSVPosts}
            >
              +
            </Icon>
          </ExpandMore>
          <ExpandMore
            sx={{ color: "green" }}
            expand={expanded}
            onClick={() => handleEditClick(eventId)}
          >
            <EditIcon sx={{ color: "green" }} />
          </ExpandMore>
          <ExpandMore
            sx={{ color: 'green' }}
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </Stack>
      </CardActions>

      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          {/* // setup map that returns all product info */}
          <Typography paragraph> {description}</Typography>
        </CardContent>
      </Collapse>

      {/* <div>product: {product.id}</div> */}
    </Card>
    // <div>
    //   <div></div>
    //   {thumbnail && (
    //     <>
    //       <div>
    //         <h1 className="event-name">{eventName}</h1>
    //         <div></div>
    //       </div>
    //       <section className="sect-event">
    //         <img src={thumbnail} className="event-img" />
    //         <div className="text-card">
    //           <h3 className="event-desc">Description: {description}</h3>
    //           <h3 className="event-category">Type of event: {eventType}</h3>
    //           <h4 className="event-date">Date: {eventDate}</h4>
    //           <h4 className="event-date">Location: {location}</h4>
    //           {user.role_id > 3 ? (
    //             <button onClick={deleteEvent}>Delete Event</button>
    //           ) : (
    //             <button onClick={handRSVPosts}>Click to Attend</button>
    //           )}
    //         </div>
    //       </section>
    //       <div>{/* <RSVPS /> */}</div>
    //     </>
    //   )}
    // </div>
  );
};

export default Event;
function handleEditClick(id: any) {
  throw new Error('Function not implemented.');
}

function id(id: any) {
  throw new Error('Function not implemented.');
}
