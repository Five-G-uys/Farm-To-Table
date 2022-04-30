import axios from 'axios';

export const updateProduct = async (productId: number, updatedProduct: any) => {
  try {
    // axios always has data property available on response obj so can destructure here
    const { data } = await axios.patch(
      `/api/product/${productId}`,
      updatedProduct
    );
    console.log('LINE 7 || PRODUCT CALLS', data);
    return data;
  } catch (err) {
    console.error('LINE 10 || PRODUCT CALLS', err);
    return { error: err };
  }
};
