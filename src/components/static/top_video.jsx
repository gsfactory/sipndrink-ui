
import Image from "next/image";
import { useState } from "react";

function TopVideo() {
    const [videoError, setVideoError] = useState(false);
    return (
        <div className="home">
            {!videoError ? (
            <video muted loop autoPlay onError={() => setVideoError(true)}>
                <source src="https://s3.amazonaws.com/client.limelox.com/sipndrink/home/sip_screen_promo.mp4" 
                type="video/mp4" />
            </video> 
            ) : (
                <Image
                      src={"https://s3.amazonaws.com/client.limelox.com/sipndrink/home/Working_space_01_20sep.jpg"}
                      alt="friends"
                      width={1100}
                      height={600}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="img-fluid"
                    />
            )}

            <div className="boder_area"></div>
        </div>
    );
}

export default TopVideo;