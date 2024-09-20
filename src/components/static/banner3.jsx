
import '@splidejs/splide/dist/css/splide.min.css';
import Splide from '@splidejs/splide';
import { useEffect } from 'react';
import Image from 'next/image';

function Banner3() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      new Splide('.splide', {
        // type   : 'loop',
        // perPage: 3,
        // autoplay: true,
        start: 1,
        perPage: 1.5,
        perMove: 1,
        gap: 20,
        type: "loop",
        drag: "free",
        snap: false,
        interval: 3000,
        arrows: true,
        pagination: true,
        rewind: true,
        rewindByDrag: true,
        lazyLoad: true,
    
        // Responsive breakpoint
        breakpoints: {
          768: {
              perPage: 1,
              snap: true
          }
        }
      }).mount();
    }
  }, []);

    return (  
        <section className="celebrate stats-counter">
            <div className="boder_area borderarea_down"></div>
            <div className="container" data-aos="fade-up">
              <div className="section-header">
                <h2>Let’s Celebrate</h2>
                <p>Life’s too short for ordinary parties! Roll the credits on dull celebrations and script your perfect day with
                a private screening, delicious bites, and a blockbuster experience at Sip n Screen</p>
                </div>
                <section className="section slider__section">
                  <div className="container slider__wrapper">
                    <div className="slider__column splide">
                        <div className="splide__track">
                          <ul className="splide__list">
                              <li className="splide__slide">
                                <img src="https://s3.amazonaws.com/client.limelox.com/sipndrink/home/Celebrate_01_20sep.png" alt="Slider" />
                                {/* <Image
                                  src={"https://s3.amazonaws.com/client.limelox.com/sipndrink/home/b3-1.jpg"}
                                  alt="friends"
                                  fill
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                /> */}
                              </li>
                              <li className="splide__slide">
                                <img src="https://s3.amazonaws.com/client.limelox.com/sipndrink/home/Celebrate_02_20sep.png" alt="Slider" />
                                {/* <Image
                                  src={"https://s3.amazonaws.com/client.limelox.com/sipndrink/home/b3-2.jpg"}
                                  alt="friends"
                                  fill
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                /> */}
                              </li>
                              <li className="splide__slide">
                                <img src="https://s3.amazonaws.com/client.limelox.com/sipndrink/home/Celebrate_03_20sep.png" alt="Slider" />
                                {/* <Image
                                  src={"https://s3.amazonaws.com/client.limelox.com/sipndrink/home/b3-3.jpg"}
                                  alt="friends"
                                  fill
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                /> */}
                              </li>
                              </ul>
                        </div>
                    </div>
                  </div>
              </section>
              <div className="button_area">
                <a data-toggle="modal" data-target="#myModal" className="bookbtn">Book Now</a>
              </div>
            </div>
          </section>
    );
}

export default Banner3;