import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductsPage = () => {
  // create state for product object
  const [product, setProduct] = useState({
    thumbnail: '',
    name: '',
    description: '',
    plant_date: '',
    harvest_date: '',
    season: '',
  });

  // Create input handler for form text
  const handelTextInput = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setProduct((state) => {
      return {
        ...state,
        [name]: value,
      };
    });
  };

  // create post req to send product form data
  const postProduct = () => {
    axios
      .post('/api/product', {
        name: product.name,
        description: product.description,
        thumbnail: product.thumbnail,
        plant_date: product.plant_date,
        harvest_date: product.harvest_date,
        season: product.season,
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then((data) => console.log('saved!', data))
      .catch((err) => console.error(err));
  };

  // Cloudinary handling
  // console.log(process.env.CLOUD_PRESET2);
  // const CLOUD_NAME = process.env.CLOUD_NAME;
  // const CLOUD_PRESET2 = process.env.CLOUD_PRESET2;
  // const showWidget = () => {
  //   const widget = window.cloudinary.createUploadWidget(
  //     {
  //       cloudName: CLOUD_NAME,
  //       uploadPreset: CLOUD_PRESET2,
  //     },
  //     (error: any, result: { event: string; info: { url: string } }) => {
  //       if (!error && result && result.event === 'success') {
  //         console.log('LINE 56', result.info.url);
  //         setEvent((state) => {
  //           return {
  //             ...state,
  //             thumbnail: result.info.url,
  //           };
  //         });
  //         console.log('LINE 63', result.info.url);
  //       }
  //     }
  //   );
  //   widget.open();
  // };

  return (
    <div>
      <form onSubmit={postProduct} className='form-product'>
        <input
          type='text'
          placeholder='Product Name'
          value={product.name}
          name='product_name'
          onChange={handelTextInput}
          className='input'
        />
        <br></br>
        <br></br>
        <textarea
          className='text-form'
          placeholder='Description'
          value={product.description}
          name='description'
          onChange={handelTextInput}
        ></textarea>
        <br></br>
        <br></br>

        <fieldset>
          <input
            type='text'
            placeholder='Plant Date'
            name='product_plant_date'
            value={product.plant_date}
            onChange={handelTextInput}
            className='form-input'
          />
          <input
            type='text'
            placeholder='Projected Harvest Date'
            value={product.harvest_date}
            name='harvest_date'
            onChange={handelTextInput}
            className='form-input'
          />
          <input
            type='text'
            placeholder='Season'
            value={product.season}
            name='season'
            onChange={handelTextInput}
            className='form-input'
          />
        </fieldset>
        <br></br>
        <br></br>
        <button type='submit' className='form--submit'>
          Save Product
        </button>
      </form>
    </div>
  );
};

export default ProductsPage;
