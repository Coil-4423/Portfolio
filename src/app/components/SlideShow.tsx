// SlideShow.tsx
import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';  // Import Swiper and SwiperSlide components
import 'swiper/swiper-bundle.css';  // Import Swiper's styles

// Import the specific Swiper modules from the appropriate sub-path
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; 

import '@/app/css/SlideShow.css';

interface SlideShowProps {
  slides: React.ReactNode[]; // Accepts an array of React elements (e.g., ProjectCard or images)
}

export default function SlideShow({ slides }: SlideShowProps) {
  return (
    <div className="slideshow-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}  // Correct path for importing modules
        spaceBetween={50}
        slidesPerView={1}
        navigation={slides.length > 1} // Only show navigation if more than one slide
        pagination={{ clickable: true }}
        // autoplay={slides.length > 1 ? { delay: 4000 } : false} 
        loop={false}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            {slide}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
