// React Imports
import React, { useState, useContext } from 'react';

// Component Imports
import { UserContext } from '../App';
import UpcomingOrderContentList from './UpcomingOrderContentList';

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
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';

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

const OrderCard = ({
  order,
  handleOpen,
  handleEditClick,
  handleDeleteOrderContent,
}: any) => {
  // expanded state var
  const [expanded, setExpanded] = useState(false);
  const user: any = useContext(UserContext);
  // toggle bool
  // console.log('LINE 49 || ORDERCARD', user.roleId);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // MAP OVER ALL PRODUCTS IN EACH ORDER INSIDE OF THE COLLAPSE
  // console.log('LINE 55 || ORDER OBJECT', order);
  return (
    <Card
      sx={{
        backgroundColor: '#e2f2d9',
        minWidth: '18rem',
        borderRadius: '2rem',
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
        // image='http://res.cloudinary.com/ddg1jsejq/image/upload/v1654098009/nzi4ldupmu4guhtruita.jpg'
        image='http://res.cloudinary.com/ddg1jsejq/image/upload/v1654099257/dd5gomuyvrayvjyihsej.jpg'
        alt='Produce'
      />
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          Scheduled to Ship on{' '}
          {dayjs(order.delivery_date.slice(0, 10)).format('dddd, MMMM D')}
        </Typography>
      </CardContent>
      {/* NEED TO CONDITIONALLY RENDER EDIT & DELETE BUTTONS FOR ADMIN */}
      <CardActions disableSpacing sx={{ justifyContent: 'center' }}>
        <Stack spacing={5} direction='row'>
          {user.roleId === 4 && (
            <ExpandMore
              sx={{ color: 'green' }}
              expand={expanded}
              onClick={() => handleEditClick(order.delivery_date)}
            >
              <EditIcon sx={{ color: 'green' }} />
            </ExpandMore>
          )}
          <ExpandMore
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
          {/* // setup map that returns a Typography */}
          {/* {user.roleId === 1 && <UpcomingOrderContentList order={order} />} */}
          <UpcomingOrderContentList
            order={order}
            handleDeleteOrderContent={handleDeleteOrderContent}
          />
        </CardContent>
      </Collapse>

      {/* <div>Order: {order.id}</div> */}
    </Card>
  );
};

export default OrderCard;
