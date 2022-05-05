/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Stack,
  styled,
  IconButton,
  IconButtonProps,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { red } from '@mui/material/colors';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

// PASS EXPANDMORE THROUGH PROPS FROM PARENT: ALSO USED IN product CARD COMPONENT
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

const SubscriptionCard = ({
  sub,
  handleEditClick,
  handleSubscriptionDeleteSubmit,
}: any) => {
  // expanded state var
  const [expanded, setExpanded] = useState(false);

  // toggle bool
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // SUBSCRIPTION DELETE
  // make a DELETE request to handle delete
  // const handleDeleteSubscription = () => {
  //   axios
  //     .delete(`/api/subscriptions/delete`, {
  //       params: { subscription_id: subscription_id },
  //     })
  //     .then((data: any) => {
  //       console.log('Subscription DELETE Success!', data);
  //     })
  //     .catch((err) => console.error(err));
  // };

  const {
    id,
    season,
    year,
    description,
    flat_price,
    weekly_price,
    start_date,
    end_date,
    thumbnail,
  } = sub;

  return (
    <div>
      <Card sx={{ minWidth: 250, borderRadius: '2.5rem', boxShadow: 24 }}>
        <CardHeader
          // avatar={
          //   <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
          //     {season[0]}
          //   </Avatar>
          // }
          subheader={`Harvest Year ${year}`}
          // NEED TO FIGURE OUT HOW TO MATCH productS TO WEEKS
          title={season}
        />
        <CardMedia
          component='img'
          height='194'
          image={
            thumbnail
              ? thumbnail
              : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.sloveg.com%2Ffresh-spring-harvest%2F&psig=AOvVaw0YMqaUPyUqS39AwMZlEsSp&ust=1651508751266000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCKCr9dfbvvcCFQAAAAAdAAAAABAD'
          }
        />
        <CardContent>
          <Typography variant='body2' color='text.secondary'>
            {`Flat Price: $${flat_price}`}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant='body2' color='text.secondary'>
            {`Weekly Price: $${weekly_price}`}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant='body2' color='text.secondary'>
            {`Inside Your Order: ${description}`}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant='body2' color='text.secondary'>
            {`Start Date: ${start_date}`}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant='body2' color='text.secondary'>
            {`End Date: ${end_date}`}
          </Typography>
        </CardContent>
        <CardActions disableSpacing sx={{ justifyContent: 'center' }}>
          <Stack spacing={5} direction='row' id='product_card_stack'>
            <ExpandMore
              sx={{ color: 'green' }}
              expand={expanded}
              onClick={() => handleSubscriptionDeleteSubmit()}
            >
              <DeleteIcon sx={{ color: 'green' }} />
            </ExpandMore>
            <ExpandMore
              sx={{ color: 'green' }}
              expand={expanded}
              onClick={() => handleEditClick(id)}
            >
              <EditIcon sx={{ color: 'green' }} />
            </ExpandMore>
            <ExpandMore
              sx={{ color: 'green' }}
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label='show more'
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </Stack>
        </CardActions>
      </Card>
    </div>
  );
};

export default SubscriptionCard;
