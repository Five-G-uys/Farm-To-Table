// React Imports
import React, { useEffect, useState } from 'react';

// MUI Imports
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import dayjs from 'dayjs';

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

const ProductCard = ({
  product,
  handleEditClick,
  updateCounter,
  getAllProducts,
  setUpdateCounter,
}: any) => {
  // expanded state var
  const [expanded, setExpanded] = useState(false);

  // toggle bool
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const { name, id, description, harvest_dates, img_url, available } = product;

  const handleProductDelete = (productId: any) => {
    axios
      .delete(`/api/products/${id}`)
      .then(({ data }: any) => {
        // console.log('LINE 57', id);
        // console.log('LINE 55 ', data);
        setUpdateCounter(updateCounter + 1);
      })
      .catch((err: any) => {
        console.error('LINE 59 ERROR');
      });
  };
  useEffect(() => {
    getAllProducts();
  }, [updateCounter]);

  // console.log('LINE 53 || PRODUCT CARD', id);
  return (
    <Card
      sx={{
        backgroundColor: '#e2f2d9',
        minWidth: '15rem',
        borderRadius: '1.2rem',
        boxShadow: 8,
        // elevation: 2,
        boxShadow: 8,
      }}
      className='texture2'
    >
      <CardHeader
        avatar={
          // MAKE AVATAR A SEASON LOGO
          <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
            {name[0]}
          </Avatar>
        }
        // subheader={`Planted on ${plant_date}`}
        // NEED TO FIGURE OUT HOW TO MATCH productS TO WEEKS
        title={name}
      />
      <CardMedia
        component='img'
        height='194'
        image={
          img_url
            ? img_url
            : 'http://res.cloudinary.com/ddg1jsejq/image/upload/v1651189122/dpzvzkarpu8vjpwjsabd.jpg'
        }
      />
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          {`Harvested on ${harvest_dates}`}
        </Typography>
      </CardContent>

      <CardActions disableSpacing sx={{ justifyContent: 'center' }}>
        <Stack spacing={5} direction='row' id='product_card_stack'>
          <ExpandMore
            sx={{ color: 'green' }}
            expand={expanded}
            onClick={() => handleProductDelete(id)}
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

      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          {/* // setup map that returns all product info */}
          <Typography paragraph> {description}</Typography>
        </CardContent>
      </Collapse>

      {/* <div>product: {product.id}</div> */}
    </Card>
  );
};

export default ProductCard;
