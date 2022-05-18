// React Imports
import React, { useState } from 'react';

// MUI Import
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

// Other Module Imports;
import dayjs from 'dayjs';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

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

const OrderCard = ({ order }: any) => {
  // expanded state var
  const [expanded, setExpanded] = useState(false);

  // toggle bool
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // MAP OVER ALL PRODUCTS IN EACH ORDER INSIDE OF THE COLLAPSE

  return (
    <Card
      sx={{
        backgroundColor: '#e2f2d9',
        minWidth: '15rem',
        borderRadius: '2.5rem',
        // elevation: 2,
        boxShadow: 8,
      }}
      className='texture2'
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
            O
          </Avatar>
        }
        // NEED TO FIGURE OUT HOW TO MATCH ORDERS TO WEEKS
        title={`Order Number: ${order.id}`}
      />
      <CardMedia
        component='img'
        height='194'
        image='https://images.unsplash.com/photo-1471193945509-9ad0617afabf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
        alt='Produce'
      />
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          Scheduled to Ship on{' '}
          {dayjs(order.delivery_date.slice(0, 10)).format('dddd, MMMM D')}
        </Typography>
      </CardContent>
      {/* NEED TO CONDITIONALLY RENDER EDIT & DELETE BUTTONS FOR ADMIN */}
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          {/* // setup map that returns a Typography */}
          <Typography paragraph>Produce</Typography>
        </CardContent>
      </Collapse>

      {/* <div>Order: {order.id}</div> */}
    </Card>
  );
};

export default OrderCard;
