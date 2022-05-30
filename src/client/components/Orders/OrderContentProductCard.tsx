import * as React from 'react';
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Stack } from '@mui/material';

const commonStyles = {
  flexWrap: 'wrap',
  width: '60vw',
  minWidth: '500px',
  bgcolor: 'transparent',
  borderColor: 'text.primary',
  m: 1,
  // to center elements absolutely inside parent
  // add event listener to window size to resize only when certain size bounds are crossed
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  border: 1,
  padding: '20px',
  borderRadius: '2rem',
  boxShadow: 24,
  p: 4,
};

const OrderContentProductCard = ({
  product,
  handleSelectedProductsChange,
}: any) => {
  return (
    <Card
      sx={{ crop: 100, borderRadius: '1.5rem' }}
      onClick={(e) => handleSelectedProductsChange(e)}
    >
      <CardActionArea
        name={String(product.id)}
        onClick={(e) => handleSelectedProductsChange(e)}
      >
        <CardMedia
          component='img'
          height='140px'
          // width={'140px'}
          // height={'120px'}
          onClick={(e: any) => handleSelectedProductsChange(e)}
          image={
            product.img_url
              ? product.img_url
              : '/static/images/cards/contemplative-reptile.jpg'
          }
          alt='green iguana'
        />
        <CardContent>
          <Stack direction='row' id='product_card_stack'>
            <FormControlLabel
              // value='end'
              control={
                <Checkbox
                  name={String(product.id)}
                  onChange={handleSelectedProductsChange}
                />
              }
              label={`${product.quantity} of ${product.name}`}
              labelPlacement='end'
            />
            {/* <Typography gutterBottom variant='h5' component='div'>
              {product.name}
            </Typography> */}
          </Stack>
          {/* <Typography variant='body2' color='text.secondary'>
            {product.quantity}
          </Typography> */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default OrderContentProductCard;
