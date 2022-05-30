import ExpandMore from '@mui/icons-material/ExpandMore';
import {
  Card,
  Box,
  CardContent,
  Stack,
  CardMedia,
  Typography,
} from '@mui/material';
import React from 'react';

const UpcomingDirectionsListEntry = ({ step, i }: any) => {
  console.log('LINE 4 || DIRECTIONS ENTRY || STEP ', step);
  console.log('LINE 5 || DIRECTIONS ENTRY ||iP ', i);
  return (
    <div>
      <Card
        sx={{ display: 'flex', backgroundColor: 'transparent', boxShadow: 0 }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'transparent',
            justifyContent: 'center',
          }}
        >
          <CardContent sx={{ flex: '1 0 auto', justifyContent: 'center' }}>
            <Typography variant='subtitle1' color='darkgreen' component='div'>
              {step.maneuver.instruction}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </div>
  );
};

export default UpcomingDirectionsListEntry;
