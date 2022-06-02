// React Imports
import React from 'react';

// MUI Imports
import ExpandMore from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Stack,
  CardMedia,
  Typography,
} from '@mui/material';

const EventDirectionListEntry = ({ step, i }: any) => {
  return (
    <div>
      <Divider
        className='direction-divider'
        variant='middle'
        sx={{ color: 'darkgreen' }}
      >
        <Chip label={`${i + 1}`} />
      </Divider>
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

export default EventDirectionListEntry;
