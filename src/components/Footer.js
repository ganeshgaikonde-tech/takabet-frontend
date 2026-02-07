import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <h3>About TakaBet</h3>
              <p>
                Your trusted platform for online betting. We offer the best odds,
                secure transactions, and 24/7 customer support.
              </p>
              <div className="social-links">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <FaFacebook />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <FaTwitter />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <FaInstagram />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  <FaYoutube />
                </a>
              </div>
            </div>

            <div className="footer-col">
              <h3>Quick Links</h3>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/category/sports-betting">Sports Betting</Link></li>
                <li><Link to="/category/casino-games">Casino Games</Link></li>
                <li><Link to="/category/promotions">Promotions</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h3>Information</h3>
              <ul>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/terms">Terms & Conditions</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h3>Responsible Gaming</h3>
              <ul>
                <li><Link to="/responsible-gaming">Gaming Guidelines</Link></li>
                <li><Link to="/self-exclusion">Self Exclusion</Link></li>
                <li><Link to="/help">Help & Support</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} TakaBet. All rights reserved.</p>
          <p className="disclaimer">
            18+ Only. Please gamble responsibly. BeGambleAware.org
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
