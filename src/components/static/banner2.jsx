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
        {/* <img src="https://s3.amazonaws.com/client.limelox.com/sipndrink/home/b2-1.jpg" alt="friends" className="img-fluid" /> */}
        <Image
          src={"https://s3.amazonaws.com/client.limelox.com/sipndrink/home/b2-1.jpg"}
          alt="friends"
          width={268}
          height={200}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="img-fluid" // Optional, for extra Bootstrap styling
        />
        <div className="section-header">
          <h5>Gather with Friends</h5>
          <p>
            Turn any day into a celebration at Sip n Screen. Catch up with friends over great food and your
            favorite movie, all in the privacy of our exclusive theater spaces.
            With gourmet bites and custom cocktails, we offer a cinematic experience like no other—where the company is as important as the film.
          </p>
        </div>
      </div>
    </div>
    <div className="col-lg-4 col-sm-4 d-flex">
      <div className="featorebox card h-100">
        {/* <img src="https://s3.amazonaws.com/client.limelox.com/sipndrink/home/b2-2.jpg" alt="date nights" className="img-fluid" /> */}
        <Image
          src={"https://s3.amazonaws.com/client.limelox.com/sipndrink/home/b2-2.jpg"}
          alt="date night"
          width={268}
          height={200}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="img-fluid" // Optional, for extra Bootstrap styling
        />
        <div className="section-header">
          <h5>The Perfect Date Night</h5>
          <p>
            Make date night special with a
            cozy dinner and a private screening. Sip handcrafted
            drinks and enjoy a film that’s just for the two of you.
          </p>
        </div>
      </div>
    </div>
    <div className="col-lg-4 col-sm-4 d-flex">
      <div className="featorebox card h-100">
        <Image
          src="https://s3.amazonaws.com/client.limelox.com/sipndrink/home/b2-3.jpg"
          alt="family time"
          width={268}
          height={200}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="img-fluid" // Optional, for extra Bootstrap styling
        />
        <div className="section-header">
          <h5>Family Time Redefined</h5>
          <p>
            Enjoy family time in our private theaters, where kids and adults alike can share in the joy of
            movies and great food. It’s the perfect weekend treat!
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