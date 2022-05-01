import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from './Product';

const ProductsRecords = () => {

  const [products, setProducts] = useState([]);

  const getProducts = () => {
    axios.get("/records/Products")
      .then((data) => {
        console.log(data);
        setProducts(data.data)
      })
      .catch((error) => {
        console.log("failed request", error);
      })
  }

  useEffect(() => {
    getProducts();
  }, []);

  console.log(products)

  return (
    <div>
      <h1>made it to Products Records</h1>
      <div>
        {Array.isArray(products) &&
          products.map(
            (product: {
              name: string;
              description: string;
              img_url: string;
              available: boolean;
              id: number;
              vendor_id: number;
              quantity: string;
            }, i) => {
              const { name, description, img_url, available, id, vendor_id, quantity } = product
              return (
                <Product
                  name={name}
                  description={description}
                  img_url={img_url}
                  available={available}
                  id={id}
                  vendor_id={vendor_id}
                  quantity={quantity}
                  key={i}
                />
              );
            }
          )}
      </div>
    </div>
  )
}

export default ProductsRecords;