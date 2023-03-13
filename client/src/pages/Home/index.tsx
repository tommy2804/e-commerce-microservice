import React from 'react';
import Categories from '../../components/Categories';
import Contact from '../../components/Contact/';
import FeaturedProducts from '../../components/FeaturedProducts';
import Slider from '../../components/Slider';
import { ProductType } from '../../utils/types/product-type';
import './Home.scss';

const Home = () => {
  return (
    <div className="home">
      <Slider />
      <FeaturedProducts type={ProductType.Featured} />
      <Categories />
      <FeaturedProducts type={ProductType.Trending} />
      <Contact />
    </div>
  );
};

export default Home;
