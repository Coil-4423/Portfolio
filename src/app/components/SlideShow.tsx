import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; // Import slick styles

interface SlideShowProps {
  slides: React.ReactNode[]; // Accepts an array of React elements (e.g., ProjectCard or images)
}

export default function SlideShow({ slides }: SlideShowProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,  // Show one slide at a time
    slidesToScroll: 1, // Scroll one slide at a time
    autoplay: true,    // Automatically transition between slides
    autoplaySpeed: 4000, // Time between transitions (4 seconds)
    arrows: true,      // Show next/prev arrows
  };

  return (
    <div className="slideshow-container">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="slide">
            {slide}
          </div>
        ))}
      </Slider>
    </div>
  );
}
