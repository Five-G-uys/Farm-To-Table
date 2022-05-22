import React, { useState, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import { Switch } from '@mui/material';
import { blue } from '@mui/material/colors';
import { HomeIcon } from '@mui/icons-material';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}
interface AppProps {
  user: { id: number; roleId: number; picture: string };
  mode: string;
  changeMode(mode: string): void;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children}
    </Slide>
  );
}

const NewNavBar = ({ user, mode, changeMode }: AppProps, props: Props) => {
  const pages = [
    { name: 'Home', path: '/' },
    { name: 'Subscribe', path: '/subscriptions-page' },
    { name: 'Products ', path: '/edit-products' },
    { name: 'Events', path: '/events-page' },
    { name: 'About', path: '/about-us-page' },
  ];
  let settings: any;
  if (user.roleId === 4) {
    settings = [
      { name: 'Manage Orders', path: '/manage-orders' },
      { name: 'Records', path: '/records' },
      // { name: 'Packing List', path: '/packing-lists' },
      // { name: 'Delivery Routes', path: '/delivery-routes' },
      { name: 'Delivery Map', path: '/delivery-map' },
      { name: 'Weather', path: '/weather-page' },
      // { name: 'Edit User Role', path: '/edit-users' },
      { name: 'Profile', path: '/profile-page' },
      { name: 'Logout', path: '/auth/api/logout' }, // NEEDS ATTENTION!
    ];
  } else if (user.roleId === 3) {
    settings = [
      // { name: 'Packing List', path: '/packing-lists' },
      // { name: 'Delivery Routes', path: '/delivery-routes' },
      { name: 'Delivery Map', path: '/delivery-map' },
      { name: 'Weather', path: '/weather-page' },
      { name: 'Profile', path: '/profile-page' },
      { name: 'Logout', path: '/auth/api/logout' },
    ];
  } else if (user.roleId === 2 || user.roleId === 1) {
    settings = [
      { name: 'Orders', path: '/orders-page' },
      { name: 'Profile', path: '/profile-page' },
      { name: 'Logout', path: '/auth/api/logout' },
    ];
  } else {
    settings = [{ name: 'Login', path: '/auth/google' }];
  }

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const [toggled, setToggled] = React.useState(false);
  return (
    <>
      <CssBaseline />
      <HideOnScroll {...props}>
        {/* Changed margins */}
        <AppBar
          position='sticky'
          // position='fixed'
          style={{
            // ORIGINAL NAVBAR STYLING
            // backgroundColor: 'lightgreen',
            // maxHeight: '5rem',
            // // margin: '.4rem',
            // justifySelf: 'center',
            // marginTop: '1rem',
            // maxWidth: '80vw',
            // margin: 'auto',
            backgroundColor: '#e2f2d9',
            maxHeight: '5rem',
            // margin: '.4rem',
            justifySelf: 'center',
            marginTop: '.7rem',
            maxWidth: '80vw',
            alignSelf: 'center',
            //margin: "auto",
            // marginRight: "1rem",
            marginLeft: '9vw',
            justifyContent: 'center',
            // marginTop: '1rem',
            // marginRight: '1rem',
            // marginLeft: '5vw',
            borderRadius: '50px',
          }}
          className='texture2'
        >
          <Container>
            <Toolbar
              sx={{
                justifyContent: 'space-between',
              }}
            >
              {/* removed disableGutters attribute from toolbar */}
              {/* added a color prop for app name on navbar */}
              <Typography
                variant='h6'
                noWrap
                component='div'
                sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                color='red'
              >
                Knock, Knock Tomatoes
              </Typography>

              <Box
                sx={{
                  flexGrow: 1,
                  maxHeight: '4rem',
                  flexDirection: 'row',
                  display: { xs: 'flex', md: 'none' },
                }}
              >
                <Button
                  size='large'
                  aria-label='account of current user'
                  aria-controls='menu-appbar'
                  aria-haspopup='true'
                  onClick={handleOpenNavMenu}
                  color='success'
                >
                  <MenuIcon />
                </Button>
                <Menu
                  id='menu-appbar'
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                      {/* // link tags are anchor tags under the hood */}
                      <Button href={`${page.path}`} color='success'>
                        <Typography textAlign='center'>{page.name}</Typography>
                      </Button>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Switch onChange={() => changeMode(mode)} color='error'></Switch>
              <Typography
                variant='h6'
                noWrap
                component='div'
                sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
              >
                Knock, Knock Tomatoes
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                  <Button
                    key={page.name}
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: 'white',
                      display: 'block',
                    }}
                    color='success'
                  >
                    <Button href={page.path} color='success'>
                      {page.name}
                    </Button>
                  </Button>
                ))}
              </Box>

              <Box sx={{ flexGrow: -1 }}>
                <Tooltip title='Open settings'>
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0 }}
                    style={
                      {
                        // position: "absolute",
                        // alignSelf: "right",
                      }
                    }
                  >
                    <Avatar
                      // alt="Profile"
                      src={user.picture}
                      style={{
                        // EDITED AVATAR HEIGHT EXPERIMENT
                        // position: "absolute",
                        border: '3px solid lightgray',
                        width: '3.0rem',
                        height: '3.0rem',
                        // alignSelf: "right",
                        // margin: "10px"
                      }}
                      component={Paper}
                      elevation={2}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id='menu-appbar'
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  // color='success'
                >
                  {settings.map((setting: any) => (
                    <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                      <Button href={setting.path} color='success'>
                        <Typography textAlign='center'>
                          {setting.name}
                        </Typography>
                      </Button>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
    </>
  );
};
export default NewNavBar;
