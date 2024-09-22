function Footer() {
  return (  
    <footer id="footer" className="footer">
      <div className="boder_area borderarea_down"></div>
      <div className="bottomfooter">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-4 col-md-4 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li><a href="/privacy-policy">Privacy Policy</a></li>
                <li><a href="/menu">Our Menu Card</a></li>
                <li><a href="#"> Terms & Conditions</a></li>
                <li><a href="#">Refund Policy</a></li>
              
              </ul>
            </div>
            <div className="col-lg-4 col-md-4 footer-links">
              <h4>Contact Us</h4>
              <ul>
                <li><a href="#"><i className="fa fa-phone"></i> +91 9492500886</a></li>
                <li><a href="#"><i className="fa fa-envelope"></i> sipnscreen@gmail.com</a></li>
                <li><a href="https://shorturl.at/PYwPw"><i className="fa fa-map-marker"></i> 
                    Hyderabad - 49
                </a></li>
                <li><a href="#"><i className="fa fa-map-marker"></i> 
                3rd floor, Sai Krishna Capital, Gopal Nagar, Hafeezpet, Hyderabad- 49
                </a></li>
              </ul>
            </div>
            <div className="col-lg-4 col-md-12">
              <h4>Social Media</h4>
              <div className="fcontact">
              <ul>
                <li><a href="#"><img src="/styles/assets/img/u.png" /></a></li>
                <li><a href="#"><img src="/styles/assets/img/i.png" /></a></li>
                <li><a href="#"><img src="/styles/assets/img/f.png" /></a></li>
              </ul>
            </div>
          </div>
            </div>

        </div>
    </div>

    <section className="footerbottom">
        <div className="copyright">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                © 2024 Sip N Screen - All Rights Reserved | Made by Avadhesh.co
              </div>
            </div>
          </div>
        </div>
    </section>
  </footer>
  );
}

export default Footer;