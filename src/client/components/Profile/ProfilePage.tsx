/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from 'react';

import React, { useContext, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import RSVPS from '../RSVPS';
import { UserContext } from '../App';
import UserCard from '../Users/UserCard';

// MUI Imports
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { CssBaseline, Box, Container } from '@mui/material';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

// PASS EXPANDMORE THROUGH PROPS FROM PARENT: ALSO USED IN user CARD COMPONENT
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

const Profile = () => {
  const user: any = useContext(UserContext);
  const { id, googleId, name, email, picture, roleId, delivery_zone } = user;
  const [expanded, setExpanded] = useState(false);
  const [newProfileUrl, setNewProfileUrl] = useState('');
  const [inEditMode, setInEditMode] = useState(false);
  const [open, setOpen] = useState(false);

  // toggle bool
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLogout = () => {
    window.location.href = '/auth/api/logout';
  };

  const CLOUD_NAME = process.env.CLOUD_NAME;
  const CLOUD_PRESET2 = process.env.CLOUD_PRESET2;

  const showWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: CLOUD_NAME,
        uploadPreset: CLOUD_PRESET2,
      },
      (error: unknown, result: any) => {
        if (!error && result && result.event === 'success') {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setNewProfileUrl(result.info.url);
        }
      },
    );
    widget.open();
  };

  const handleProfilePhotoUpdate = () => {
    axios
      .patch(`/api/users/${id}`, { picture: newProfileUrl })
      .then((response) => {
        console.log('Handle Profile Photo Update Response: ', response);
      })
      .catch((err) => {
        console.error('Handle Profile Photo Update Error: ', err);
      });
  };

  useEffect(() => {
    if (newProfileUrl.length) {
      handleProfilePhotoUpdate();
    }
  }, [newProfileUrl]);
  console.log('New Profile Url: ', newProfileUrl);

  return (
    <Box className='page-wrap'>
      <CssBaseline />
      {/* Hero unit */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth='sm'>
          <Typography
            component='h1'
            variant='h2'
            align='center'
            color='text.primary'
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
          borderRadius: '2.5rem',
          boxShadow: 20,
          marginLeft: '250px',
          marginRight: '250px',
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
              {name[0]}
            </Avatar>
          }
          subheader={`Email: ${email}`}
          title={name}
        />
        <CardContent>
          <img className='profilePic' src={user.picture}></img>
        </CardContent>

        <CardActions disableSpacing sx={{ justifyContent: 'center' }}>
          <Stack spacing={5} direction='row' id='user_card_stack'>
            <ExpandMore
              sx={{ color: 'green' }}
              expand={expanded}
              // onClick={() => handleEditClick(id)}
            >
              <Button
                variant='text'
                size='large'
                color='success'
                sx={{ color: 'green' }}
                onClick={showWidget}
              >
                Change User Image
              </Button>
            </ExpandMore>
            {/* <ExpandMore
              sx={{ color: 'green' }}
              expand={expanded}> */}
            <Button
              variant='text'
              size='large'
              color='warning'
              sx={{ color: 'red' }}
              onClick={handleLogout}
            >
              Logout
            </Button>
            {/* </ExpandMore> */}
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
            {/* User Orders */}
            <RSVPS />
          </CardContent>
        </Collapse>
      </Card>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </Box>
  );
};

export default Profile;
