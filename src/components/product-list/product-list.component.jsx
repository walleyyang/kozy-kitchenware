import React from 'react';

import { Product } from '../product/product.component';

import './product-list.styles.css';

export const ProductList = props => (
  <div className='product-list'>
    {
      props.products.map(product => (
        <Product
          key={product.id}
          product={product} />
      ))
    }
  </div>
);
