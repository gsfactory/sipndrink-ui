
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

const Banner = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const slidesRef = useRef([]);
  const controlsRef = useRef([]);
  const intervalRef = useRef(null);

  const slides = [
    // { id: 1, imageUrl: 'https://s3.amazonaws.com/client.limelox.com/sipndrink/imgs/banner.jpg' },
    // { id: 2, imageUrl: 'https://s3.amazonaws.com/client.limelox.com/sipndrink/banner/party-8080105_640.jpg' },
    // { id: 3, imageUrl: 'https://s3.amazonaws.com/client.limelox.com/sipndrink/banner/concert-2527495_640.jpg' }
    { id: 1, imageUrl: 'https://s3.amazonaws.com/client.limelox.com/sipndrink/home/slide1.jpg' },
    { id: 2, imageUrl: 'https://s3.amazonaws.com/client.limelox.com/sipndrink/home/slide2.jpg' },
    { id: 3, imageUrl: 'https://s3.amazonaws.com/client.limelox.com/sipndrink/home/slide3.jpg' },
  ];

  useEffect(() => {
    startSlideShow();

    return () => {
      clearInterval(intervalRef.current); // Cleanup on component unmount
    };
  }, [activeSlide]);

  const startSlideShow = () => {
    intervalRef.current = setInterval(() => {
      changeSlides(activeSlide + 1);
    }, 8000);
  };

  const changeSlides = (newSlide) => {
    const prevActive = activeSlide;
    setActiveSlide((prevActive) => (newSlide >= slides.length ? 0 : newSlide));

    // If you need to do something when the slide changes, you can use the refs here
    slidesRef.current[prevActive].classList.remove('active');
    controlsRef.current[prevActive].classList.remove('active');
    slidesRef.current[activeSlide].classList.add('active');
    controlsRef.current[activeSlide].classList.add('active');
  };

  const handleControlClick = (index) => {
    clearInterval(intervalRef.current);
    changeSlides(index);
    startSlideShow();
  };

  return (
    <div className="slider-container">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`slide ${index === activeSlide ? 'active' : ''}`}
          ref={(el) => (slidesRef.current[index] = el)}
          style={{ backgroundImage: `url(${slide.imageUrl})` }}
        >
          <div className="banner-contentarea"></div>
        </div>
      ))}

      <div className="controls-container">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`control ${index === activeSlide ? 'active' : ''}`}
            ref={(el) => (controlsRef.current[index] = el)}
            onClick={() => handleControlClick(index)}
          ></div>
        ))}
      </div>

      <div className="boder_area"></div>
    </div>
  );
};

export default Banner;
