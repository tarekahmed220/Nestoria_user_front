import React from "react";
import "../../css modules/heroSection.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import ProductCarousel from "./ProductSection";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className=" min-h-screen text-white font-serif">


      {/* Main Content */}
      <div className="flex justify-center items-center h-80 bg-black relative text-center text-white overflow-hidden hero_section">
           

        <div className="absolute inset-0 bg-black opacity-60" />
        <div className="relative text-center">

<img
  src="/images/about/home-hotspot-img-1.jpg"
  alt="Background"
  className="w-full h-auto object-cover rounded-lg shadow-lg"
/>
<div className="absolute inset-0 bg-black opacity-60"></div>
<div className="absolute inset-0 flex flex-col justify-center items-center px-4 sm:px-8 md:px-16 lg:px-24">
  <div className="m-auto w-full max-w-4xl text-center text-white">
    <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
      Work Shop Profile
    </h3>
    <div className="text-center my-4">
      <Link to="/">
        <span className="text-white hover:text-orange-500 duration-500 text-base sm:text-lg md:text-xl lg:text-2xl">
          Home
        </span>
      </Link>
      <span className="text-[#A5A5A5] mx-2"> / </span>
      <span className="text-[#A5A5A5] text-base sm:text-lg md:text-xl lg:text-2xl">
        Work Shop Profile
      </span>
    </div>
  </div>
</div>
</div>
      </div>

      {/* Work-Shop Details */}
      <section className="py-16 px-8 md:px-16 lg:px-32 ">
        <div className="flex justify-center items-start space-x-8">
          
          {/* Left Section */}
          <div className="w-1/2 pr-8">
            <h2 className="text-3xl font-semibold mb-4">Workshop Name</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              Location: 123 Main St, New York, NY
            </p>
            <p className="text-gray-400 mb-4">
              Our workshop provides top-notch services for home décor. Whether you're looking for custom furniture or interior design solutions, we are here to help. With over 10 years of experience, we have helped thousands of customers create their dream homes.
            </p>
          </div>

          {/* Vertical Line */}
          <div className="border-l border-gray-600 h-auto"></div>

          {/* Right Section */}
          <div className="w-1/2 pl-8">
            <h2 className="text-3xl font-semibold mb-4">Message Title</h2>
            <p className="text-gray-400 mb-6">
              Share your thoughts or reach out to us for more information!
            </p>

            {/* Rating */}
            <div className="mb-6">
              <p className="text-gray-300 mb-2">Rating:</p>
              <div className="flex space-x-2">
                <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                <FontAwesomeIcon icon={faStarHalfAlt} className="text-yellow-400" />
              </div>
            </div>

            {/* Button */}
            <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded w-full">
                Message me !
            </button>
          </div>
        </div>
      </section>
      
      <ProductCarousel />

    </div>
  );
};
export default HeroSection;
