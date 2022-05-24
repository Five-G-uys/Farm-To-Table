// Import Dependencies
import React, { useState, useContext } from 'react';
import { UserContext } from '../App';

// MUI IMPORTS
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, IconButtonProps, Stack, styled, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
  handleAddressForm,
  subscription,
  subscriptions,
  getAllSubscriptions,
  deleteSubscription,
}: any) => {
  const user: any = useContext(UserContext);
  const { roleId } = user;

  // expanded state var
  const [expanded, setExpanded] = useState(false);

  // toggle bool
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
      <Card
        sx={{
          backgroundColor: '#e2f2d9',
          minWidth: '15rem',
          borderRadius: '2.5rem',
          boxShadow: 8,
        }}
        className='texture2'
      >
        <CardHeader
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
              : 'http://res.cloudinary.com/ddg1jsejq/image/upload/v1651189122/dpzvzkarpu8vjpwjsabd.jpg'
          }
        />
        <CardContent>
          <Typography
            sx={{ fontSize: 20 }}
            variant='body2'
            color='text.secondary'
          >
            {`Flat Price: $${flat_price}`}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography
            sx={{ fontSize: 20 }}
            variant='body2'
            color='text.secondary'
          >
            {`Weekly Price: $${weekly_price}`}
          </Typography>
        </CardContent>

        <CardContent>
          <Typography
            sx={{ fontSize: 20 }}
            variant='body2'
            color='text.secondary'
          >
            {`Start Date: ${start_date}`}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography
            sx={{ fontSize: 20 }}
            variant='body2'
            color='text.secondary'
          >
            {`End Date: ${end_date}`}
          </Typography>
        </CardContent>
        <CardActions disableSpacing sx={{ justifyContent: 'center' }}>
          <Stack spacing={5} direction='row' id='product_card_stack'>
            {roleId > 3 && (
              <ExpandMore
                sx={{ color: 'green' }}
                expand={expanded}
                onClick={() => deleteSubscription(id)}
              >
                <DeleteIcon sx={{ color: 'green' }} />
              </ExpandMore>
            )}
            {roleId > 3 && (
              <ExpandMore
                sx={{ color: 'green' }}
                expand={expanded}
                onClick={() => handleEditClick(id)}
              >
                <EditIcon sx={{ color: 'green' }} />
              </ExpandMore>
            )}
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
          {roleId < 4 && (
            <Button
              variant='contained'
              color='success'
              size='small'
              // type='submit'
              sx={{ color: 'white' }}
              onClick={() => handleAddressForm(sub)}
            >
              SUBSCRIBE
            </Button>
          )}
        </CardActions>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <CardContent>
            {/* // setup map that returns all product info */}
            <Typography variant='body2' color='text.secondary'>
              {`Inside Your Order: ${description}`}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

export default SubscriptionCard;
