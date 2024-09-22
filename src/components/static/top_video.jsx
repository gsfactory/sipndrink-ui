// import styles from './video.module.css';

function TopVideo() {
    return (
        <div className="home">
            <video muted loop autoPlay>
                <source src="https://s3.amazonaws.com/client.limelox.com/sipndrink/home/sip_screen_promo.mp4" type="video/mp4" />
            </video>

            <div className="boder_area"></div>
        </div>
    );
}

export default TopVideo;