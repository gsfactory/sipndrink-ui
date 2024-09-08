import Image from "next/image";

function Banner4() {
    return (  
        <section id="stats-counter" className="stats-counter">
            <div className="container" data-aos="fade-up">
              <div className="section-header">
                <h2>Make Every Moment Special</h2>
                <p>Whether you’re here to 'cake' it till you make it, 'spark' joy with our décor, or 'reel' in the best movie
                nights—every visit is a blockbuster hit!</p>
                </div>
              <div className="row gy-4 align-items-center">
                <div className="col-lg-4 col-sm-4">
                  <div className="featorebox">
                    {/* <img src="https://s3.amazonaws.com/client.limelox.com/sipndrink/home/b4-1.jpg" alt="" className="img-fluid" /> */}
                    <Image
                      src={"https://s3.amazonaws.com/client.limelox.com/sipndrink/home/b4-1.jpg"}
                      alt="friends"
                      width={268}
                      height={200}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="img-fluid" // Optional, for extra Bootstrap styling
                    />
                    <div className="section-header">
                      <h5>Cakes That Bring a Smile</h5>
                      <p>From decadent cakes to sweet bites, our treats are the icing on
                        your celebration. Every slice is a reason to smile!</p>
                      </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-4">
                  <div className="featorebox">
                    {/* <img src="https://s3.amazonaws.com/client.limelox.com/sipndrink/home/b4-2.jpg" alt="" className="img-fluid" /> */}
                    <Image
                      src={"https://s3.amazonaws.com/client.limelox.com/sipndrink/home/b4-2.jpg"}
                      alt="lights"
                      width={268}
                      height={200}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="img-fluid" // Optional, for extra Bootstrap styling
                    />
                    <div className="section-header">
                      <h5>Lights, Sparkle, Action!</h5>
                      <p>With twinkling lights and dazzling decor, we turn ordinary
                        days into star-studded events. Feel like a superstar in our enchanting space</p>
                      </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-4">
                  <div className="featorebox">
                    {/* <img src="https://s3.amazonaws.com/client.limelox.com/sipndrink/home/b4-3.jpg" alt="" className="img-fluid" /> */}
                    <Image
                      src={"https://s3.amazonaws.com/client.limelox.com/sipndrink/home/b4-3.jpg"}
                      alt="movies"
                      width={268}
                      height={200}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="img-fluid" // Optional, for extra Bootstrap styling
                    />
                    <div className="section-header">
                      <h5>Movies & Memories</h5>
                      <p>Enjoy your favorite films in our private theaters—where every
                          movie night becomes a cherished memory with loved ones.</p>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
    );
}

export default Banner4;