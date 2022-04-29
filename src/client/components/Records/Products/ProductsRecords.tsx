import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from './Product';
// interface AppProps {
//   name: string;
//   description: string;
//   img_url: string;
//   available: boolean;
//   id: number;
//   vendor_id: number;
//   quantity: string;
// }

const ProductsRecords = (/*{
  name,
  description,
  img_url,
  available,
  id,
  vendor_id,
  quantity,
}: AppProps*/) => {

  // const [products, setProducts] = useState({ productsArray: {} });

  // const getProducts = () => {
  //   axios.get("/records/Products")
  //     .then((data) => {
        // console.log(data);
        // setProducts((state) => {
        //   return {
        //     ...state,
        //     ProductsArray: [...data.data],
        //   }
        // })
  //     })
  //     .catch((error) => {
  //       console.log("failed request", error);
  //     })
  // }

  // useEffect(() => {
  //   getProducts();
  // }, []);

  // console.log(name)
  return (
    <div>
      <h1>made it to Products Records</h1>
      {/* <div>
        {Array.isArray(products.productsArray) &&
          products.productsArray.map(
            (product: {
              name: string;
              description: string;
              img_url: string;
              available: boolean;
              id: number;
              vendor_id: number;
              quantity: string;
            }) => {
              const { name, description, img_url, available, id, vendor_id, quantity } = product
              return (
                <ProductsRecords
                  name={name}
                  description={description}
                  img_url={img_url}
                  available={available}
                  id={id}
                  vendor_id={vendor_id}
                  quantity={quantity}
                />
              );
            }
          )}
      </div> */}
    </div>
  )
}

export default ProductsRecords;