import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="footer" id="contact">
      <div className="footer-content">
        <h2 className="footer-title">coach zeko</h2>
        <div className="footer-contact">
          <div className="footer-contact-item">
            <FontAwesomeIcon icon={faMapMarkerAlt} /> القاهرة، مصر
          </div>
          <div className="footer-contact-item">
            <FontAwesomeIcon icon={faPhone} /> 0106 720 3240
          </div>
          <div className="footer-contact-item">
            <FontAwesomeIcon icon={faEnvelope} /> yahyahatem53@gmail.com
          </div>
        </div>

        {/* أزرار السوشيال ميديا بشكل حديث */}
        <div className="footer-social-buttons">
          <a href="https://www.facebook.com/yahya.hatem.94" target="_blank" rel="noopener noreferrer" className="social-btn facebook-btn">
            <FontAwesomeIcon icon={faFacebookF} className="icon" /> Facebook
          </a>
          <a href="https://www.instagram.com/coach_zeko" target="_blank" rel="noopener noreferrer" className="social-btn instagram-btn">
            <FontAwesomeIcon icon={faInstagram} className="icon" /> Instagram
          </a>
          <a href="https://rb.gy/9wruhd" target="_blank" rel="noopener noreferrer" className="social-btn tiktok-btn">
            <FontAwesomeIcon icon={faTiktok} className="icon" /> TikTok
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;