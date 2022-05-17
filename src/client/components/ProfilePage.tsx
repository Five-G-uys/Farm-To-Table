/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from 'react';

import React, { useContext, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import RSVPS from "./RSVPS";
import { UserContext } from "./App";
import UserCard from "./Users/UserCard";

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

import dayjs from "dayjs";
import { CssBaseline, Box, Container } from "@mui/material";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

// PASS EXPANDMORE THROUGH PROPS FROM PARENT: ALSO USED IN user CARD COMPONENT
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

const Profile = () => {
  const user: any = useContext(UserContext);
  const { id, googleId, name, email, address, picture, roleId, delivery_zone } =
    user;

  const [expanded, setExpanded] = useState(false);

  // toggle bool
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLogout = () => {
    window.location.href = "/auth/api/logout";
  };

  // handle click + edit form functionality for edit button in Product Card component
  const handleEditClick = (userId: any) => {
    console.log("LINE 171 || USER PAGE CLICKED", userId);

    const clickedUser: any = users.find(
      // find mutates original array values
      (usr: any) => usr.id === userId
    );

    setUser({
      id: userId,
      googleId: clickedUser.googleId,
      name: clickedUser.name,
      email: clickedUser.email,
      address: clickedUser.address,
      picture: clickedUser.picture,
      // farm_id: clickedUser.farm_id,
      roleId: clickedUser.roleId,
    });
    setInEditMode(true);
    setOpen(true);
  };

  return (
    <div className="page-wrap">
      <CssBaseline />
      {/* Hero unit */}
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            User Profile
          </Typography>
        </Container>
      </Box>
      {/* Added new configurations for profile pages width and commented out the minWidth prop */}
      <Card
        sx={{
          //minWidth: 250,
          borderRadius: "2.5rem",
          boxShadow: 20,
          marginLeft: "250px",
          marginRight: "250px",
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {name[0]}
            </Avatar>
          }
          subheader={`Role: ${roleId === 4 ? "Admin" : "User"}`}
          title={name}
        />
        <CardContent>
          <img className="profilePic" src={user.picture} />
        </CardContent>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {`Email: ${email}`}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {`Delivery Address: ${address || ""}`}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {`Delivery Zone: ${delivery_zone || ""}`}
          </Typography>
        </CardContent>
        <CardContent>
          <Button variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        </CardContent>

        <CardActions disableSpacing sx={{ justifyContent: "center" }}>
          <Stack spacing={5} direction="row" id="user_card_stack" fontSize={30}>
            Reminders
            {/* <ExpandMore
              sx={{ color: "green" }}
              expand={expanded}
              onClick={() => handleEditClick(id)}
            >
              <EditIcon sx={{ color: "green" }} />
            </ExpandMore> */}
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
          <CardContent>
            {/* User Orders */}
            <RSVPS />
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

export default Profile;
