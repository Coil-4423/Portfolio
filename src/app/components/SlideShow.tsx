// SlideShow.tsx
import React from "react";
import Slider from "react-slick";
import { CustomPrevArrow, CustomNextArrow } from './CustomArrow'; // Import custom arrow components
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '@/app/css/SlideShow.css'; // Your custom CSS

interface SlideShowProps {
  slides: React.ReactNode[]; // Accepts an array of React elements (e.g., ProjectCard or images)
}

export default function SlideShow({ slides }: SlideShowProps) {
  const settings = {
    dots: true,
    infinite: slides.length > 1,  // Disable infinite scroll if only one slide
    speed: 500,
    slidesToShow: 1,  // Show one slide at a time
    slidesToScroll: 1, // Scroll one slide at a time
    autoplay: slides.length > 1,    // Only autoplay if more than one slide
    autoplaySpeed: 4000, // Time between transitions (4 seconds)
    arrows: slides.length > 1,      // Only show arrows if more than one slide
    prevArrow: <CustomPrevArrow />, // Use custom prev arrow
    nextArrow: <CustomNextArrow />  // Use custom next arrow
  };
  
  return (
    <div className="slideshow-container">
      <Slider {...settings}>
        {slides}
      </Slider>
    </div>
  );
}
