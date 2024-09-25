import Image from "next/image";
import MyImage from "../utils/image";

function Banner2() {
    return (  
        <section id="stats-counter" className="stats-counter">
            <div className="container" data-aos="fade-up">
  <div className="section-header">
    <h2>Welcome to Sip n Screen</h2>
    <p>Where Cinema Meets Culinary Delight</p>
    <p>
      At Sip n Screen, it's all about movies, coffee, and great vibes. Every film hits harder, every bite tastes
      better, and every moment counts. Your new favorite hangout awaits!
    </p>
  </div>
  <div className="row gy-4">
    <div className="col-lg-4 col-sm-4 d-flex">
      <div className="featorebox card h-100">
        <Image
          src={"https://s3.amazonaws.com/client.limelox.com/sipndrink/home/Cafe_01.png"}
          alt="friends"
          width={268}
          height={200}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="img-fluid" // Optional, for extra Bootstrap styling
        />
        <div className="section-header">
          <h5>Café for You</h5>
          <p>
          Feel the warmth of every sip, the flavor of every bite, and the mesmerizing atmosphere that makes every moment worth savoring. Whether you're here for a blockbuster or a brew, we’ve crafted the perfect space to unwind and immerse yourself. 
          </p>
        </div>
      </div>
    </div>
    <div className="col-lg-4 col-sm-4 d-flex">
      <div className="featorebox card h-100">
        <Image
          src={"https://s3.amazonaws.com/client.limelox.com/sipndrink/home/Private_Theater_02.png"}
          alt="date night"
          width={268}
          height={200}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="img-fluid" // Optional, for extra Bootstrap styling
        />
        <div className="section-header">
          <h5>The Perfect Family Night</h5>
          <p>
          Make family night special with a cozy dinner and a private screening. Sip handcrafted drinks while the whole family enjoys a film just for you, creating an unforgettable experience filled with cozy vibes, warm lighting, and cinematic charm for all ages to enjoy together.
          </p>
        </div>
      </div>
    </div>
    <div className="col-lg-4 col-sm-4 d-flex">
      <div className="featorebox card h-100">
        <Image
          src="https://s3.amazonaws.com/client.limelox.com/sipndrink/home/Celebration_03.png"
          alt="family time"
          width={268}
          height={200}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="img-fluid" // Optional, for extra Bootstrap styling
        />
        <div className="section-header">
          <h5>Celebration</h5>
          <p>
          Turn any day into a celebration at Sip n Screen. Catch up with friends over great food and your favorite movie, all in the privacy of our exclusive theater spaces. With gourmet bites and custom cocktails, we offer a cinematic experience like no other—where the company is as important as the film.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
          </section>
    );
}

export default Banner2;