// Import Dependencies
import { CssBaseline, Box, Container, Typography } from '@mui/material';
import React from 'react';

const AboutUsPage = () => {
  return (
    <div>
      <CssBaseline />
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
            // boxShadow: '0 0 4px 1px rgba(25,25,25,1)',
            boxShadow: 8,
          }}
        >
          <Typography
            component='h1'
            variant='h2'
            align='center'
            color='text.primary'
            gutterBottom
          >
            About Us
          </Typography>
          <Typography
            variant='h5'
            align='center'
            color='text.primary'
            paragraph
          >
            If you're looking for info on our farm team, our organic practices,
            or our customer policies you've come to the right place!
          </Typography>
          <iframe
            width='560'
            height='315'
            src='https://www.youtube.com/embed/kEq6enJEv_I'
            title='YouTube video player'
            frameborder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowfullscreen
          ></iframe>
        </Container>
      </Box>
    </div>
  );
};

export default AboutUsPage;
