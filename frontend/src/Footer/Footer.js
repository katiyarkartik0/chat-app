import React from "react";
import {
  FaEnvelope,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaGithub,
} from "react-icons/fa";
import "./Footer.css";
import mernLogo from "utils/MERNlogo/MERN-logo_adobe_express.svg";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="made-with">
          Made with <img  src={mernLogo} loading="lazy" className='mern_logo' alt="MERN"/> by Kartik Katiyar
        </div>
        <br></br>
        <div className="social-icons">
          <a
            href="mailto:your.email@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaEnvelope className="icon" />
          </a>
          <a
            href="https://www.linkedin.com/in/your-linkedin"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="icon" />
          </a>
          <a
            href="https://www.instagram.com/your-instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="icon" />
          </a>
          <a
            href="https://twitter.com/your-twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="icon" />
          </a>
          <a
            href="https://twitter.com/your-twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="icon" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
