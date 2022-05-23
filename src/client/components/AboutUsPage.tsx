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
        <Container maxWidth='sm'>
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
            color='text.secondary'
            paragraph
          >
            If you're looking for info on our farm team, our organic practices,
            or our customer policies you've come to the right place!
          </Typography>
        </Container>
      </Box>
    </div>
  );
};

export default AboutUsPage;
