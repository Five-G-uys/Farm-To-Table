// Import Dependencies
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import RSVPS from '../RSVPS/RSVPS';
import { UserContext } from '../App';

//COMPONENT IMPORTS
import ProfileModal from './ProfileModal';

// MUI Imports
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
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
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  // const { id, name, email, phone, dietaryRestriction, picture } = user;
  const [expanded, setExpanded] = useState(false);
  const [newProfileUrl, setNewProfileUrl] = useState('');
  // const [inEditMode, setInEditMode] = useState(false);
  // const [open, setOpen] = useState(false);
  // const [updateCounter, setUpdateCounter] = useState(0);

  // const [profile, setProfile] = useState({
  //   id: '',
  //   name: '',
  //   email: '',
  //   phone: '',
  //   dietaryRestriction: '',
  //   picture: '',
  // });

  // toggle bool
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLogout = () => {
    window.location.href = '/auth/api/logout';
  };

  // Box component styles
  // const commonStyles = {
  //   width: '40vw',
  //   minWidth: '500px',
  //   bgcolor: 'background.paper',
  //   borderColor: 'text.primary',
  //   m: 1,
  //   position: 'absolute',
  //   top: '50%',
  //   left: '50%',
  //   transform: 'translate(-50%, -50%)',
  //   border: 1,
  //   padding: '20px',
  //   borderRadius: '2rem',
  //   boxShadow: 24,
  //   overflow: 'auto',
  // };

  // // Handlers for backdrop control
  // const handleClose = () => {
  //   setOpen(false);
  //   setInEditMode(false);
  //   setProfile({
  //     id: '',
  //     name: '',
  //     email: '',
  //     phone: '',
  //     dietaryRestriction: '',
  //     picture: '',
  //   });
  // };

  // const handleInputProfile = (
  //   event:
  //     | React.ChangeEvent<HTMLInputElement>
  //     | React.ChangeEvent<HTMLTextAreaElement>,
  // ) => {
  //   const { name, value } = event.target;
  //   setProfile((state) => {
  //     return {
  //       ...state,
  //       [name]: value,
  //     };
  //   });
  // };

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
        console.log('Handle Profile Photo Update Response: ', response.data);
      })
      .catch((err) => {
        console.error('Handle Profile Photo Update Error: ', err);
      });
  };

  // const updateProfile = async (id: any, updatedProfile: any) => {
  //   try {
  //     const { data } = await axios.patch(`/api/users/${id}`, updatedProfile);
  //     toast.success('Profile Updated', {
  //       position: 'top-right',
  //       autoClose: 2000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //     });
  //     return data;
  //   } catch (err) {
  //     console.error('Handle Profile Update Error: ', err);
  //     return { error: err };
  //   }
  // };

  // // create function to handle update form submission
  // const handleProfileUpdateSubmit = async (e: any) => {
  //   e.preventDefault();
  //   try {
  //     // call async function that was imported from apiCalls/productCalls
  //     const result = await updateProfile(profile.id, profile);
  //     // keep in try so it doesn't rerender on error
  //     setUpdateCounter(updateCounter + 1);
  //     handleClose();
  //   } catch (err) {
  //     console.error('LINE 152 || Profile Update ', err);
  //   }
  // };

  useEffect(() => {
    if (newProfileUrl.length) {
      handleProfilePhotoUpdate();
    }
  }, [newProfileUrl]);

  // const handleEditClick = (id: any) => {
  //   const clickedProfile: any = profile.find(
  //     // find mutates original array values
  //     (sub: any) => profile.id === id,
  //   );
  //   clickedProfile.picture = clickedProfile.picture
  //     ? clickedProfile.picture
  //     : 'http://res.cloudinary.com/ddg1jsejq/image/upload/v1651189122/dpzvzkarpu8vjpwjsabd.jpg';

  //   setProfile({
  //     id: id,
  //     name: clickedProfile.name,
  //     email: clickedProfile.email,
  //     phone: clickedProfile.phone,
  //     dietaryRestriction: clickedProfile.dietaryRestriction,
  //     picture: clickedProfile.picture,
  //   });
  //   setInEditMode(true);
  //   setOpen(true);
  // };

  return (
    <Box className='page-wrap' justifyContent='center'>
      <CssBaseline />
      {/* Hero unit */}
      <Box
        sx={{
          bgcolor: 'transparent',
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
      {/* <ProfileModal
        handleInputProfile={handleInputProfile}
        handleProfileUpdateSubmit={handleProfileUpdateSubmit}
        commonStyles={commonStyles}
        open={open}
        inEditMode={inEditMode}
        updateProfile={updateProfile}
        handleEditClick={handleEditClick}
      /> */}
      {/* Added new configurations for profile pages width and commented out the minWidth prop */}
      <Box justifyContent='center' display='flex' alignItems='center'>
        <Card
          sx={{
            marginLeft: '250px',
            marginRight: '250px',
            maxWidth: '500px',
            backgroundColor: '#e2f2d9',
            borderRadius: '2rem',
            boxShadow: 8,
            justifyContent: 'center',
          }}
          className='texture2'
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
          <Stack spacing={5} direction='row' id='user_card_stack'>
            <CardMedia image={user.picture} component='img' height='194' />
            <CardContent>ADDRESS</CardContent>
          </Stack>
          <CardActions disableSpacing sx={{ justifyContent: 'center' }}>
            <Stack spacing={5} direction='row' id='user_card_stack'>
              <Button
                variant='text'
                size='large'
                color='success'
                sx={{ color: 'green' }}
                onClick={showWidget}
              >
                Change User Image
              </Button>
              <Button
                variant='text'
                size='large'
                color='warning'
                sx={{ color: 'red' }}
                onClick={handleLogout}
              >
                Logout
              </Button>
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
      </Box>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </Box>
  );
};

export default Profile;
function setUser(arg0: {
  id: number;
  googleId: any;
  name: any;
  email: any;
  address: any;
  picture: any;
  // farm_id: clickedUser.farm_id,
  roleId: any;
}) {
  throw new Error('Function not implemented.');
}

function setInEditMode(arg0: boolean) {
  throw new Error('Function not implemented.');
}
