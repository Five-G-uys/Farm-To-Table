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
          <Container maxWidth='sm'>
            <Typography
              component='h1'
              variant='h2'
              align='center'
              color='text.primary'
              gutterBottom
            >
              Knock, Knock Tomatoes
            </Typography>
            {/* <CardMedia
              component='img'
              height='194'
              image='src/media/homePageImage.jpg'
              alt='Produce'
            /> */}
            <Typography
              variant='h5'
              align='center'
              color='text.secondary'
              paragraph
            >
              Community Supported Agriculture is a way for farms to serve their
              communities & for their communities to serve them. It's a
              beautifully organized delivery system designed to compliment both
              the farmers & the eaters so both parties have a chance to learn,
              work, & grow with each other.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
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
              {/* <Button variant='outlined'>Secondary action</Button> */}
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth='md'>
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
                Knock, Knock
              </Typography>
              <Typography>
                Who's There? A 4-month subscription of weekly boxes filled with
                the freshest produce from our farm.
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </main>
    </div>
  );
};

export default HomePage;

// {/* <Container sx={{ py: 8 }} maxWidth='md'>
// {/* End hero unit */}
// <Grid container spacing={4}>
//   {cards.map((card) => (
//     <Grid item key={card} xs={12} sm={6} md={4}>
//       <Card
//         sx={{
//           height: '100%',
//           display: 'flex',
//           flexDirection: 'column',
//         }}
//       >
//         <CardMedia
//           component='img'
//           sx={{
//             // 16:9
//             pt: '56.25%',
//           }}
//           image='http://res.cloudinary.com/ddg1jsejq/image/upload/v1651189122/dpzvzkarpu8vjpwjsabd.jpg'
//           alt='random'
//         />
//         <CardContent sx={{ flexGrow: 1 }}>
//           <Typography gutterBottom variant='h5' component='h2'>
//             Knock, Knock
//           </Typography>
//           <Typography>
//             Who's There? A 4-month subscription of weekly boxes filled
//             with the freshest produce from our farm.
//           </Typography>
//         </CardContent>
//         <CardActions>
//           {/* <Button size='small'>View</Button>
//           <Button size='small'>Edit</Button> */}
//         </CardActions>
//       </Card>
//     </Grid>
//   ))}
// </Grid>
// </Container> */}
