function Banner() {
    return (  
    <div className="slider-container">
        <div className="slide" style={{ backgroundImage: "url('/styles/assets/img/banner.jfif')" }}>
          <div className="banner-contentarea">
          </div>
        </div>
        <div className="slide" style={{ backgroundImage: "url('/styles/assets/img/banner.jfif')" }}>
        </div>
        <div className="slide" style={{ backgroundImage: "url('/styles/assets/img/banner.jfif')" }}>
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