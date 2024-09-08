import Image from "next/image";

function Banner5() {
    return (  
        <section className="sbi stats-counter">
        <div className="section-header">
          <h2>Smile on Face</h2>
          <p>At Sip N Screen, we’re all about 'serving' joy! From 'cake-walking' through desserts to 'vibing' in our
private theaters, We’ve got the ingredients to keep your smile on fleek.</p>
          <p>Come vibe with us and 'LOL' through every moment.</p>
          <div className="accordion">
            <div className="tab">
              <Image
                src={"https://s3.amazonaws.com/client.limelox.com/sipndrink/home/b5-1.jpg"}
                alt="birthday"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="caption">
                <h2 className="text-white">Birthday</h2>
                <p>Turn your birthday into a canvas of joy,
                  where every slice and smile paints a perfect day!</p>
              </div>
            </div>
            <div className="tab">
              <Image
                src={"https://s3.amazonaws.com/client.limelox.com/sipndrink/home/b5-2.jpg"}
                alt="anniversary"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="caption">
                <h2 className="text-white">Anniversary</h2>
                <p>Celebrate the love that grows stronger with each passing year,
                  creating timeless memories and endless smiles.</p>
              </div>
            </div>
            <div className="tab">
              <Image
                src={"https://s3.amazonaws.com/client.limelox.com/sipndrink/home/b5-3.jpg"}
                alt="baby shower"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="caption">
                <h2 className="text-white">Baby Shower</h2>
                <p>Welcome new beginnings with heartwarming joy and giggles, as we
                  toast to the little miracle on the way!</p>
              </div>
            </div>
            <div className="tab">
              <Image
                src={"https://s3.amazonaws.com/client.limelox.com/sipndrink/home/b5-4.jpg"}
                alt="farewell"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="caption">
                <h2 className="text-white">Farewell</h2>
                <p>Bid adieu with heartfelt cheers and cherished moments, creating a
                  send-off as memorable as the times shared.</p>
              </div>
            </div>
            <div className="tab">
              <Image
                src={"https://s3.amazonaws.com/client.limelox.com/sipndrink/home/b5-5.jpg"}
                alt="bride"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="caption">
                <h2 className="text-white">Bride-to-Be</h2>
                <p>Honor the bride-to-be with a celebration as
                  radiant and unforgettable as her journey ahead!</p>
              </div>
            </div>
            <div className="tab">
              <Image
                src={"https://s3.amazonaws.com/client.limelox.com/sipndrink/home/b5-6.jpg"}
                alt="romantic dates"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="caption">
                <h2 className="text-white">Romantic Dates</h2>
                <p>Craft an evening of pure romance, where every
                    glance and touch is wrapped in a smile that says 'forever'.</p>
              </div>
            </div>
          </div>
          <div className="button_area">
            <a data-toggle="modal" data-target="#myModal" className="bookbtn">Book Now</a>
          </div>
        </div>
      
      </section>
    );
}

export default Banner5;