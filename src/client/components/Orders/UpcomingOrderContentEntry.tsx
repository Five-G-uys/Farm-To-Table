import React, { useContext, useState } from 'react';
// COMPONENT IMPORTS
import { UserContext } from '../App';
// MUI Import
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';

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

const UpcomingOrderContentEntry = ({
  product,
  productId,
  orderId,
  orderContentId,
  delivery_date,
  handleDeleteOrderContent,
}: any) => {
  // console.log('LINE 15 || PRODUCT', product);
  // const theme = useTheme();
  const user: { id: number; roleId: number } = useContext(UserContext);
  // console.log('LINE 39 || ORDERSPAGE', user.roleId);
  const id = user.id;

  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
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
            <Stack direction='row' justifyContent={'center'} spacing={5}>
              <CardMedia
                component='img'
                sx={{ width: '6rem', borderRadius: '1rem' }}
                image={product.img_url}
                alt='Live from space album cover'
              />
              <Stack>
                <Typography
                  variant='subtitle1'
                  color='text.secondary'
                  component='div'
                >
                  {`${product.quantity}  ${product.name}`}
                </Typography>
                {user.roleId > 3 && (
                  <ExpandMore
                    sx={{ color: 'green' }}
                    expand={expanded}
                    onClick={() =>
                      handleDeleteOrderContent(
                        orderContentId,
                        productId,
                        orderId,
                        delivery_date,
                      )
                    }
                  >
                    <DeleteIcon sx={{ color: 'green' }} />
                  </ExpandMore>
                )}
              </Stack>
            </Stack>
          </CardContent>
        </Box>
      </Card>
    </div>
  );
};

export default UpcomingOrderContentEntry;
