import React from 'react';

// Component Imports
import OrderContentProductCard from './OrderContentProductCard';

// Import MUI Components
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import { Grid } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

// NEED TO MAKE IT SO THAT PRODUCTS THAT HAVE ALREADY BEEN ADDED TO AN ORDER

const commonStyles = {
  flexWrap: 'wrap',
  width: '60vw',
  minWidth: '500px',
  bgcolor: '#e2f2d9',
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

const useStyles = makeStyles({
  gridContainer: {
    paddingTop: '60px',
    justifyContent: 'center',
    // paddingLeft: '5vw',
    // paddingRight: '5vw',
  },
});

const OrderContentModal = ({
  handleClose,
  products,
  deliveryDate,
  open,
  orders,
  handleSelectedProductsChange,
  handleOrderContentSubmit,
}: any) => {
  const classes = useStyles();

  // console.log(
  //   'LINE 64 || PRODUCTS',
  //   products,
  //   orders,
  //   deliveryDate,
  //   // orders.map((order: any) => {
  //   //   return order.products.map((product: any) => {
  //   //     return product.id;
  //   //   });
  //   // }),
  //   // // .flat(),
  // );
  // products.filter((product: any) => {

  const selectedOrder = orders.find((order: any) => {
    // console.log('LINE 79 || SELECTED ORDER', order, deliveryDate);
    return order.delivery_date === deliveryDate;
  });

  // array of product ids in selected order
  const productIds = selectedOrder
    ? selectedOrder.products.map((product: any) => product.id)
    : [];

  console.log('LINE 89 || SELECTED ORDER || ', selectedOrder, productIds);

  const availableProducts: any = selectedOrder
    ? products
        .filter((product: any) => !productIds.includes(product.id))
        .map((product: any) => {
          return (
            <Grid
              item
              xs={10}
              sm={5}
              md={4}
              lg={3}
              xl={3}
              // add margin
              // p={10}
              key={product.name + product.id}
            >
              <OrderContentProductCard
                product={product}
                handleSelectedProductsChange={handleSelectedProductsChange}
                onClick={handleSelectedProductsChange}
              />
            </Grid>
          );
        })
    : null;
  // });
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          borderRadius: '1rem',
          boxShadow: 24,
          overflow: 'scroll',
        }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 750,
        }}
        className='add_x_form_modal'
      >
        <Fade in={open} timeout={{ appear: 300, enter: 300, exit: 400 }}>
          <Box sx={commonStyles} className='texture2'>
            <form onSubmit={handleOrderContentSubmit}>
              <Grid
                container
                spacing={2}
                // p={4}
                direction='row'
                justifyContent='center' // center vs flex-start
                alignItems='center'
                className={classes.gridContainer}
              >
                {selectedOrder && availableProducts.length > 0 ? (
                  availableProducts
                ) : (
                  <Typography
                    variant='h5'
                    align='center'
                    color='text.secondary'
                    paragraph
                  >
                    No Available Products :c
                  </Typography>
                )}
                {/* </FormGroup> */}
              </Grid>
              <Button
                variant='text'
                size='large'
                type='submit'
                sx={{ color: 'green' }}
              >
                SAVE
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default OrderContentModal;
