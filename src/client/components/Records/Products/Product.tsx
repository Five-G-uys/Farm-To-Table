import React, { useState, useEffect } from "react";
import axios from "axios";
interface AppProps {
  name: string;
  description: string;
  img_url: string;
  available: boolean;
  id: number;
  vendor_id: number;
  quantity: string;
}

const Product = ({
  name,
  description,
  img_url,
  available,
  id,
  vendor_id,
  quantity,
}: AppProps) => {
  console.log({name})
  return (
    <div>
      <h1>{name}</h1>
      <h1>{description}</h1>
      <h1>{img_url}</h1>
      <h1>{available}</h1>
      <h1>{id}</h1>
      <h1>{vendor_id}</h1>
      <h1>{quantity}</h1>     
    </div>
  )
}

export default Product;