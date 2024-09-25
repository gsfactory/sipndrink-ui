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
                <li>
                <a 
                  href="/final_menu.pdf" 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  SipnScreen Menu
                </a>
                </li>
                <li><a href="privacy-policy"> Terms & Conditions</a></li>
                <li><a href="refund-policy">Refund Policy</a></li>
                <li><a href="/bookings">Admin Area</a></li>
              </ul>
            </div>
            <div className="col-lg-4 col-md-4 footer-links">
              <h4>Contact Us</h4>
              <ul>
                <li className="text-dark"><i className="fa fa-phone"></i> +91 9492500886</li>
                <li className="text-dark"><i className="fa fa-envelope"></i> sipnscreen@gmail.com</li>
                <li className="text-dark"><i className="fa fa-map-marker"></i> 
                <div className="pl-2">
                3rd floor, Sai Krishna Capital, Gopal Nagar, Hafeezpet, Hyderabad- 49
                </div>
                </li>
                <li><a href="https://maps.app.goo.gl/fS4BmWx5bvXVjUL69" target="_blank"><i className="fa fa-map-marker"></i> 
                Google Map - Click to Visit us
                </a></li>
              </ul>
            </div>
            <div className="col-lg-4 col-md-12">
              <h4>Social Media</h4>
              <div className="fcontact">
              <ul>
                <li><a href="https://youtube.com/@sipnscreen-social?si=KoUjyow7Kmx9xaCz" target="_blank"><img src="/styles/assets/img/u.png" /></a></li>
                <li><a href="https://www.instagram.com/sipnscreen?igsh=OWwzbXJnbTgwMW8=" target="_blank"><img src="/styles/assets/img/i.png" /></a></li>
                <li><a href="https://www.facebook.com/profile.php?id=61565845657820&mibextid=ZbWKwL" target="_blank"><img src="/styles/assets/img/f.png" /></a></li>
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