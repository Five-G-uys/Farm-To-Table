/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CssBaseline,
  Box,
  Container,
  Typography,
  Stack,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from '@mui/material';
import axios from 'axios';
import React from 'react';

const handleLogin = () => {
  axios
    .get('auth/google')
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
};

const Login = () => {
  return (
    <div className='profile-card'>
      <CssBaseline />
      <main>
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
              Login To Knock, Knock
            </Typography>
            <Typography
              variant='h5'
              align='center'
              color='text.secondary'
              paragraph
            >
              Login using Google to become a member today!
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction='row'
              spacing={2}
              justifyContent='center'
            >
              <form action='/auth/google' method='GET'>
                <Button variant='contained' type='submit'>
                  Sign In With Google
                </Button>
              </form>
              {/* <Button variant='outlined'>Secondary action</Button> */}
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth='md'>
          {/* End hero unit */}
        </Container>
      </main>
    </div>

    // </div>
  );
};

export default Login;
