import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme } from '@mui/material/styles';
import { Card, CardMedia, CardContent, CardActions } from '@mui/material';
import { borderRadius } from '@mui/system';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

const HomePage = ({ getAllSubscriptions }: any) => {
  // interface Farms {name: string, description: string, id: number, farmArray: any}
  const [farms, setFarms] = useState([]);
  const navigate = useNavigate();

  const getFarms = () => {
    axios
      .get('/api/farms')
      .then((data: any) => {
        // console.log("front end axios call", data)
        setFarms(data.data);
      })
      .catch((err: unknown) => {
        console.error('OH NOOOOO', err);
      });
  };
  useEffect(() => {
    getFarms();
  }, []);

  return (
    <div>
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
          <Container
            maxWidth='sm'
            sx={{
              padding: '3rem 2rem',
              background: 'rgba(0,0,0,0)',
              backdropFilter: 'blur(3px)',
              borderRadius: '2rem',
              boxShadow: '0 0 4px 1px rgba(25,25,25,1)',
              // boxShadow: 8,
            }}
          >
            <Typography
              component='h1'
              variant='h2'
              align='center'
              color='text.primary'
              gutterBottom
            >
              Knock, Knock Tomatoes
            </Typography>
            <CardMedia
              component='img'
              height='194'
              width='auto'
              //Rainbow image='http://res.cloudinary.com/ddg1jsejq/image/upload/v1651189122/dpzvzkarpu8vjpwjsabd.jpg' //default rainbow
              //image='http://res.cloudinary.com/ddg1jsejq/image/upload/v1654051948/bgr7pdi9ifkfmgmhi99l.jpg' //Tomatoes
              // image='http://res.cloudinary.com/ddg1jsejq/image/upload/v1654050705/uofoifgt6ced1btybcny.png' //new rainbow produce
              // image='http://res.cloudinary.com/ddg1jsejq/image/upload/v1654052233/oyxbvubzdgdytblycpsc.jpg' //tomato basket
              image='http://res.cloudinary.com/ddg1jsejq/image/upload/v1654052298/tdxl7ohcwxqwbbtohxhe.webp' //sliced tomatoes
              alt='default image'
            />
            <Typography
              variant='h5'
              padding='10px'
              align='center'
              color='text.primary'
              paragraph
            >
              Community Supported Agriculture is a way for farms to serve their
              communities & for their communities to serve them. It's a
              beautifully organized delivery system designed to compliment both
              the farmers & the eaters so both parties have a chance to learn,
              work, & grow with each other.
            </Typography>
            <br></br>
            <Stack
              sx={{ pt: 0 }}
              direction='row'
              spacing={2}
              justifyContent='center'
            >
              <Button
                variant='contained'
                color='success'
                sx={{ color: 'white' }}
                onClick={() => navigate('/subscriptions-page')}
              >
                Sign Up
              </Button>
            </Stack>
          </Container>
        </Box>
        {/* <Container sx={{ py: 8 }} maxWidth='md'>
          <Card
            sx={{
              backgroundColor: '#e2f2d9',
              minWidth: '15rem',
              borderRadius: '2rem',
              boxShadow: 8,
            }}
            className='texture2'
          >
            <CardMedia
              component='img'
              height='194'
              image='http://res.cloudinary.com/ddg1jsejq/image/upload/v1651189122/dpzvzkarpu8vjpwjsabd.jpg'
              alt='random'
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant='h5' component='h2'>
                Who's There? A 4-month subscription of weekly boxes filled with
                the freshest produce from our farm.{' '}
              </Typography>
            </CardContent>
          </Card>
        </Container> */}
      </main>
    </div>
  );
};

export default HomePage;
