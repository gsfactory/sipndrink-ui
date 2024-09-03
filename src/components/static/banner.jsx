
function Banner() {
    return (  
    <div className="slider-container">
        <div className="slide" style={{ backgroundImage: "url('https://s3.amazonaws.com/client.limelox.com/sipndrink/imgs/banner.jpg')" }}>
          <div className="banner-contentarea">
          </div>
        </div>
        <div className="slide" style={{ backgroundImage: "url('https://s3.amazonaws.com/client.limelox.com/sipndrink/banner/party-8080105_640.jpg')" }}>
        </div>
        <div className="slide" style={{ backgroundImage: "url('https://s3.amazonaws.com/client.limelox.com/sipndrink/banner/concert-2527495_640.jpg')" }}>
        </div>    
        <div className="controls-container">
          <div className="control"></div>
          <div className="control"></div>
          <div className="control"></div>
        </div>
        <div className="boder_area"></div>
    </div>
    );
}

export default Banner;