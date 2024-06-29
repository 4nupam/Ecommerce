// Hero.js
import React from "react";
import { useData } from '../ContextApi/FetchingData';
import "./Hero.css";

import Filter from "../FilterCard.jsx/Filter";
import Products from "../Products/Products";
import Footer from "../Footer/Footer";

function Hero() {
  const { data, loading, error } = useData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
   <section className="text-gray-600 body-font">
  <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Before they sold out
      iPhone 14 Series
      </h1>
      <p className="mb-8 leading-relaxed">Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant cold-pressed tacos poke beard tote bag. Heirloom echo park mlkshk tote bag selvage hot chicken authentic tumeric truffaut hexagon try-hard chambray.</p>
      
    </div>
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
      <img className="object-cover object-center rounded" alt="hero" src="https://images.pexels.com/photos/16005007/pexels-photo-16005007/free-photo-of-apple-iphone-14-pro-max-mobile-phone.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"/>
    </div>
  </div>
</section>
<Filter/>
<Products/>
    <Footer/>
    </>
  );
}

export default Hero;
