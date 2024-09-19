import Image from "next/image";

function Banner4() {
    return (  
        <section id="stats-counter" className="stats-counter">
            <div className="container" data-aos="fade-up">
              <div className="section-header">
                <h2>Make Every Moment Special</h2>
                <p>Whether you’re here to 'cake' it till you make it, 'spark' joy with our décor, or 'reel' in the best movie nights—every visit is a blockbuster hit! </p>
              </div>
              <div className="row gy-4 align-items-stretch">
                <div className="col-lg-4 col-sm-4 d-flex">
                  <div className="featorebox card h-100 d-flex flex-column">
                    <Image
                      src={"https://s3.amazonaws.com/client.limelox.com/sipndrink/home/b4-1.jpg"}
                      alt="friends"
                      width={268}
                      height={200}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="img-fluid"
                    />
                    <div className="section-header flex-grow-1">
                      <h5>Your creative workspace - get things done in style</h5>
                      <p>Designed for focus and inspiration, our workspace offers the perfect blend of comfort and productivity. Sip your coffee, plug in, and let the creativity flow in a relaxed, energizing atmosphere.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-4 d-flex">
                  <div className="featorebox card h-100 d-flex flex-column">
                    <Image
                      src={"https://s3.amazonaws.com/client.limelox.com/sipndrink/home/b4-2.jpg"}
                      alt="lights"
                      width={268}
                      height={200}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="img-fluid"
                    />
                    <div className="section-header flex-grow-1">
                      <h5>Lights, Sparkle, Action!</h5>
                      <p>With twinkling lights and dazzling decor, we turn ordinary days into star-studded events. Feel like a superstar in our enchanting space.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-4 d-flex">
                  <div className="featorebox card h-100 d-flex flex-column">
                    <Image
                      src={"https://s3.amazonaws.com/client.limelox.com/sipndrink/home/b4-3.jpg"}
                      alt="movies"
                      width={268}
                      height={200}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="img-fluid"
                    />
                    <div className="section-header flex-grow-1">
                      <h5>Movies & Memories</h5>
                      <p>Enjoy your favorite films in our private theaters—where every movie night becomes a cherished memory with loved ones.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
    );
}

export default Banner4;