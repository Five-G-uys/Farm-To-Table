import React from 'react';
import ProductCard from './ProductCard';
import { Grid } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  gridContainer: {
    paddingTop: '40px',
    paddingLeft: '4rem',
    paddingRight: '4rem',
  },
});

const ProductsContainer = ({ products, handleEditClick }: any) => {
  console.log('LINE 5 || PRODUCTSCONTAINER', products);
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={4}
      className={classes.gridContainer}
      // justify='center'
    >
      {products.map((product: any) => {
        return (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={3}
            key={product.name + product.id}
          >
            <ProductCard
              product={product}
              key={product.name + product.id}
              handleEditClick={handleEditClick}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ProductsContainer;
