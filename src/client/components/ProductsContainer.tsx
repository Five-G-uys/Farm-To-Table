import React from 'react';
import ProductCard from './ProductCard';
import { Grid } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  gridContainer: {
    paddingTop: '60px',
    justifyContent: 'center',
    paddingLeft: '5vw',
    paddingRight: '5vw',
  },
});

const ProductsContainer = ({
  products,
  handleEditClick,
  inEditMode,
  getAllProducts,
  updateCounter,
  setUpdateCounter,
}: any) => {
  // console.log('LINE 5 || PRODUCTSCONTAINER', products);
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={6}
      className={classes.gridContainer}
      // justify='center'
    >
      {products.map((product: any) => {
        return (
          <Grid
            item
            xs={10}
            sm={5}
            md={4}
            lg={3}
            xl={3}
            key={product.name + product.id}
          >
            <ProductCard
              product={product}
              key={product.name + product.id}
              handleEditClick={handleEditClick}
              inEditMode={inEditMode}
              products={products}
              getAllProducts={getAllProducts}
              updateCounter={updateCounter}
              setUpdateCounter={setUpdateCounter}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ProductsContainer;
