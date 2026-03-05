import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="footer" id="contact">
      <div className="footer-content">
        <h2 className="footer-title">The professor coach</h2>
        <div className="footer-contact">
          <div className="footer-contact-item">
            <FontAwesomeIcon icon={faMapMarkerAlt} /> القاهرة، مصر
          </div>
          <div className="footer-contact-item">
            <FontAwesomeIcon icon={faPhone} />
            <span>0106<span></span>720<span></span>3240</span>
          </div>
          <div className="footer-contact-item">
            <FontAwesomeIcon icon={faEnvelope} />
            <span>yahyahatem53@gmail.com</span>
          </div>
        </div>

        <div className="footer-social-buttons">
          <a href="https://www.facebook.com/share/1ZZJyY3SoR/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="social-btn facebook-btn">
            <FontAwesomeIcon icon={faFacebookF} className="icon" /> Facebook
          </a>
          <a href="https://www.instagram.com/coach_zeko1?igsh=MXR0djI4cHVxODUyNw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="social-btn instagram-btn">
            <FontAwesomeIcon icon={faInstagram} className="icon" /> Instagram
          </a>
          <a href="https://www.tiktok.com/@yahyazeko55?_r=1&_t=ZS-92g27umASTl" target="_blank" rel="noopener noreferrer" className="social-btn tiktok-btn">
            <FontAwesomeIcon icon={faTiktok} className="icon" /> TikTok
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
