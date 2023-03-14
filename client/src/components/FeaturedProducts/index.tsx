import React from 'react';
import Card from '../Card';
import './FeaturedProducts.scss';

import useFetch from '../../hooks/use-fetch';

import { CartState } from '../../redux/types/cart';
import { ProductType } from '../../utils/types/product-type';

interface FeaturedProductsProps {
  type: ProductType;
}

const FeaturedProducts = ({ type }: FeaturedProductsProps) => {
  const { data, error } = useFetch<CartState['products']>(
    `/products?populate=*&[filters][type][$eq]=${type}`
  );

  return (
    <div className="featuredProducts">
      <div className="top">
        <h1>{type} products</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo
          viverra maecenas accumsan lacus vel facilisis labore et dolore magna aliqua. Quis ipsum
          suspendisse ultrices gravida. Risus commodo viverra maecenas.
        </p>
      </div>
      <div className="bottom">
        {error
          ? 'Something went wrong!'
          : !data
          ? 'loading'
          : data.map((item) => <Card item={item} key={item.id} />)}
      </div>
    </div>
  );
};

export default FeaturedProducts;
